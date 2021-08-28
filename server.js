const express = require("express");
const app = express();
const PORT = process.env.PORT || 3737;
const nodemailer = require("nodemailer");
const path = require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("contect", { msg: false });
});

app.post("/send", async (req, res) => {
  const { name, company, email, phone, message } = req.body;
  const output = `
    <p>you have new contect request</p>
    <h3>contect Details</h3>
    <ul>
    <li>name:${name}</li>
    <li>Company:${company}</li>
    <li>Email:${email}</li>
    <li>phone:${phone}</li>
    </ul>
    <h3>massege</h3>
    <p>${message}</p>`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "yourgmail@gmail.com",
      pass: "your password",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = {
    from: '"nodemiler 👻" sender address@gmail.com>', // sender address
    to: "receiverm@gmail.com", // list of receivers
    subject: "Node contect request ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(info, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId + " " + info.response);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      res.render("contect", { msg: "email has been send " });
    }
  });
});

app.listen(PORT, () => {
  console.log(`connected server ${PORT}`);
});
