import UserModel from "../../model/user.model.js";
import bcrypt from "bcrypt";

// Handle Register Request
const handleSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    return res.json({ status: true, msg: "Record registered" });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default handleSignUp;
