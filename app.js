const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// usage
app.use(bodyparser.json());
app.use(cors());
app.use(express.static("public"));

const mongouri = process.env.MONGODBURI;

mongoose
  .connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("-----------------------------------------");
    console.log("kudos your database got connected 🍾🍷");
    console.log("-----------------------------------------");
  })
  .catch((err) => {
    console.log("----------------------------------------------");
    console.log("something went wrong in Database connection!");
    console.log("error :", err);
    console.log("----------------------------------------------");
  });

// import routes
const userRoutes = require("./routes/user.routes");
const placeServiceRoutes = require("./routes/service.routes");
const workerRelatedRoutes = require("./routes/workerRelated.routes");
const orderRoutes = require("./routes/order.routes");
const feedbackRoutes = require("./routes/feedback.routes");

// access images
app.use("/workerDocuments", express.static("uploads/workerDocuments"));

// <---- Routes  ---->
app.use(userRoutes);
app.use(workerRelatedRoutes);
app.use(orderRoutes);
app.use(feedbackRoutes);
app.use(placeServiceRoutes);

const port = process.env.PORT;

app.get("/", (request, response) => {
  response.json({
    status: 200,
    message: `server is running on ${port} for reCreate`,
  });
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on port : ${port}`);
});
