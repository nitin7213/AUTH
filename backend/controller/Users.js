import UserModel from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Handle Register Request
const handleSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.json({ msg: "User already exists" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({
      username,
      email,
      password: hashpassword,
    });

    return res.json({ status: true, msg: "Record registered" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Handle Login Request
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.json({ message: "user is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });

  // Set token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 360000,
  });

  return res.json({ status: true, message: "login successfully" });
};

//User verification using token
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.KEY);

    // If verification succeeds, call next to move to the next middleware/route handler
    next();
  } catch (err) {
    // If there's an error in token verification, handle it gracefully
    return res
      .status(401)
      .json({ status: false, message: "Token verification failed" });
  }
};

// Success Message Route
const successMsg = (req, res) => {
  return res.json({ status: true, message: "authorized" });
};

//Handle Forget Password
const handleForgetPass = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "user not registered" });
  } catch (err) {
    console.log(err);
  }
};

//Handle the Logout
const handleLogout = (req, res) => {
  // Clear token cookie
  res.clearCookie("token");
  return res.json({ status: true });
};

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  verifyUser,
  successMsg,
  handleForgetPass,
};
