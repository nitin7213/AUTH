import jwt from "jsonwebtoken";
import UserModel from "../../model/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/auth/token.js";

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401); // No refresh token provided

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!decoded) return res.sendStatus(403); // Invalid refresh token

    // Find the user by refresh token in the database
    const user = await UserModel.findOne({ refreshToken });

    if (!user) return res.sendStatus(403);
    console.log(user.username); // No user found with this refresh token

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    // Optionally, generate a new refresh token
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set the new tokens in cookies
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
    });

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.sendStatus(403); // Forbidden
  }
};

export default handleRefreshToken;
