import UserModel from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailCallback from "../services/nodemailer.js";

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  const accessToken = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "5m",
  });

  // Set token in cookie
  res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 60000 });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 360000,
    secure: true,
    sameSite: "strict",
  });

  return res.json({ status: true, message: "login successfully" });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User verification middleware using token
const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    // Verify token
    jwt.verify(accessToken, process.env.KEY);

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Handle Forget Password
const handleForgetPass = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "user not registered" });

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    // Sending Mail
    await sendMailCallback({ email, token });
    // If mail is successfully sent, send response
    res.json({ status: true, message: "email sent" });
  } catch (err) {
    console.log(err);
    // If there's an error, send error response
    res.status(500).json({ status: false, message: "error sending email" });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle the Reset Password
const handleResetPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);

    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(400).json({ message: "invalid token" });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Handle the Logout
const handleLogout = (req, res) => {
  // Clear token cookie
  res.clearCookie("accessToken");
  return res.json({ status: true });
};

export {
  handleSignUp,
  handleLogin,
  handleLogout,
  verifyUser,
  successMsg,
  handleForgetPass,
  handleResetPass,
};
