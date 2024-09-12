const express = require("express");
const app = express();
const financialRouter = require("./routers/financial.router");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const ORIGIN = process.env.ORIGIN;

// ตั้งค่า CORS
const corsOptions = {
  origin: ORIGIN, // ใช้ค่าจาก .env หรือค่าเริ่มต้น
};

//use Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Financial Tracker API </h1>");
});

//Use router
app.use("/api/vi/financial", financialRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
