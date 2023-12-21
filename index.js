const express = require("express");
const app = express();
const port = 5000;
const dbConnect = require("./db");
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin ,X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(express.json());
const CreateUser = require("./routes/CreateUser");
const DisplayData = require("./routes/DisplayData");
const OrderData = require("./routes/OrderData");

app.use("/api", CreateUser);
app.use("/api", DisplayData);
app.use("/api", OrderData);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
