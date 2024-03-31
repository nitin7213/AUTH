import nodeMailer from "nodemailer";

const sendMailCallback = async ({ email, token }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "testifyofficial721@gmail.com",
        pass: "vggx xuzn fmis rtzn",
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");

    const mailOptions = {
      from: "testifyofficial721@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Valid for 5 minutes. Click the following link to reset your password: http://localhost:5173/forgetpass/${token}`,
      html: `<p>Valid for 5 minutes.<br>Click <a href="http://localhost:5173/resetpass/${encodedToken}">here</a> to reset your password.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info; // Return the info object
  } catch (err) {
    console.log(err);
  }
};

export default sendMailCallback;
