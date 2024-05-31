import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App created using express");
});

const senderEmail = process.env.SEMAIL;
const receiverEmail = process.env.REMAIL;
const password = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: senderEmail,
    pass: password,
  },
});

app.post("/send-email", async (req, res) => {
  const fullNAme = req.body.fullName;
  const email = req.body.email;
  const subject = req.body.subject;
  const query = req.body.query;
  console.log(fullNAme);

  try {
    await transporter.sendMail({
      from: senderEmail,
      to: receiverEmail,
      subject: subject,
      text: `Name : ${fullNAme} Email : ${email} Query : ${query} `,
    });
  } catch (err) {
    res.status(400).json({ succes: false, message: err.message });
  }

  res.status(200).json({
    success: true,
    message: "Mail sent successfully",
  });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
