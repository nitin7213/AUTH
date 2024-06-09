// import jwt from "jsonwebtoken";
// import UserModel from "../model/user.model.js";

// const authenticateToken = async (req, res, next) => {
//   try {
//     const { accessToken } = req.cookies;

//     if (!accessToken) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized - No Access Token Provided" });
//     }

//     jwt.verify(
//       accessToken,
//       process.env.ACCESS_TOKEN_SECRET,
//       async (err, decoded) => {
//         if (err) {
//           return res
//             .status(401)
//             .json({ error: "Unauthorized - Invalid Access Token" });
//         }

//         const user = await UserModel.findById(decoded.userId).select(
//           "-password"
//         );

//         if (!user) {
//           return res.status(404).json({ error: "User not found" });
//         }

//         req.user = user;
//         next();
//       }
//     );
//   } catch (error) {
//     console.log("Error in authenticateToken middleware: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default authenticateToken;
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
