import UserModel from "../model/Users.js";
import bcypt from "bcrypt";

//Handle Post Req
const handlePost = async (req, res) => {
  const { username, email, password } = req.body;
  const user = UserModel.findOne({});
};

export default handlePost;
