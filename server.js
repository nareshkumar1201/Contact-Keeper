const express = require("express");
const app = express();
const userRoute = require("./Routes/user");
const contactRoute = require("./Routes/contact");
const authRoute = require("./Routes/auth");
const connectDB = require("./config/db");

connectDB();
app.use(express.json({ extended: false }));

app.use("/api/user", userRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
