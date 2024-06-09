import UserModel from "../../model/user.model.js";
import jwt from "jsonwebtoken";

const handleUserName = async (req, res) => {
  try {
    // Extract access token from cookies
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    // If neither access token nor refresh token is present, return an empty response
    if (!accessToken && !refreshToken) {
      return res.json({});
    }

    if (!accessToken) {
      return res.status(401).json({
        message:
          "Access token not provided. This endpoint requires authentication.",
      });
    }

    // Extract user ID from the access token payload (assuming it contains the user ID)
    // This step depends on your implementation of token generation and decoding
    const userId = extractUserIdFromAccessToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Find the user by ID in the database
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If refresh token is not present, return username
    if (!refreshToken) {
      return res.json({ message: "refresh token not present" });
    }

    // Return user information (e.g., name) along with refresh token
    res.json({ name: user.username, refreshToken });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Function to extract user ID from access token payload
const extractUserIdFromAccessToken = (accessToken, ACCESS_TOKEN_SECRET) => {
  try {
    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    return decodedToken.id; // Assuming the payload contains the user ID
  } catch (error) {
    console.error("Error extracting user ID from access token:", error);
    return null;
  }
};

export default handleUserName;
