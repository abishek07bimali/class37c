const express = require("express");
const app = express();
const { sequelize, connectDB } = require("./database/db");
const cors=require("cors")
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true  
}));
app.use(express.json())
app.use("/api/user/",require('./routes/route'))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

const startServer = async () => {
  await connectDB();
  await sequelize.sync();
  app.listen(5000, () => {
    console.log(`Server is running on port ${5000}`);
  });
};
startServer();
