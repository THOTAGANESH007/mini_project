import nodemailer from "nodemailer";
/*
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ganeshthota656@gmail.com",
    pass: "xtaz fhdw vwcc jebo",
  },
});

var mailOptions = {
  from: "ganeshthota656@gmail.com",
  to: "gathota150@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

*/

import dotenv from "dotenv";

//dotenv.config({ path: "../.env" }); // Load environment variables from .env file
dotenv.config();
//console.log(process.env.USEREMAIL);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSEMAIL,
  },
});

/**
 * Function to send an email
 * @param {Object} options - Email details
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body content (HTML format)
 */
export async function sendEmail({ to, subject, html }) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

export default sendEmail;
