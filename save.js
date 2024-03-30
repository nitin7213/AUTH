//Backend
// npm i express mongoose nodemon
// npm i bcrypt jsonwebtoken cors dotenv cookie-parser

//Frontend
//npm i vite
//npm i react-router-dom

//For using import in server side instead of 'require' You  have to write 'type:module' in package.json
// Use Import ---> export default
// import UserModel from "../model/Users.js"; Remember to write users.js full path

// For require --> module.exports={}

//env--> process.env.var
const nodeMailer = require("nodemailer");

async function sendMailCallback() {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "testifyofficial721@gmail.com",
        pass: "vggx xuzn fmis rtzn",
      },
    });
    const mailOptions = {
      from: "testifyofficial721@gmail.com",
      to: "nitineon123@gmail.com",
      subject: "test msg",
      html: `<p>hi,</p>`,
      attachments: [
        {
          filename: "Logo.png",
          path: "./Logo.png",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}
sendMailCallback();
