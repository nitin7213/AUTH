import UserModel from "../../model/user.model.js";

const handleLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // If no refresh token is present, return a 204 No Content status
  if (!refreshToken) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.sendStatus(204); // No Content
  }

  // Find the user by the refresh token
  const user = await UserModel.findOne({ refreshToken });

  // If no user is found, clear the cookies and return a 204 No Content status
  if (!user) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.sendStatus(204); // No Content
  }

  // If user is found, remove the refresh token from the database
  user.refreshToken = null;
  await user.save();

  // Clear the cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  // Return a success message
  return res.json({ status: true, message: "Logout successful" });
};

export default handleLogout;
