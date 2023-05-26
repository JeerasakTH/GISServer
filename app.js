const express = require("express");
const cors = require("cors");

const { PORT } = require("./src/constants");
const userRoute = require("./src/route/userRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api", userRoute);

const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

appStart();
