const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // 1. Configure the "Transporter" (The delivery truck)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Define the email content
    const mailOptions = {
      from: `"SabiSell Alerts" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html, // We use HTML so the emails look pretty
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendEmail;