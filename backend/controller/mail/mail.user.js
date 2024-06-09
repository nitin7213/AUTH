import UserModel from "../../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMailCallback from "../../services/mail/nodemailer.js";

// Handle Forget Password
const handleForgetPass = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "User not registered" });

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    // Sending Mail
    await sendMailCallback({ email, token });

    // If mail is successfully sent, send response
    res.json({ status: true, message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    // If there's an error, send error response
    res.status(500).json({ status: false, message: "Error sending email" });
  }
};

// Handle the Reset Password
const handleResetPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_KEY);

    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);

    await UserModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password updated" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return res.status(400).json({ message: "Invalid token" });
  }
};

// Success Message Route
const successMsg = (req, res) => {
  return res.json({ status: true, message: "Authorized" });
};

export { handleForgetPass, handleResetPass, successMsg };
