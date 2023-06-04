import express from "express";
import bodyParser from "body-parser";
import v1DeviceRouter from "./v1/routes/deviceRoutes.js";
import v1RemoteRouter from "./v1/routes/remoteRoutes.js";
import swaggerDocs from "./v1/swagger.js";

const app = express();
const PORT = process.env.PORT || 5004;

app.get("/", (req, res) => {
  res.send(`Welcome to aXmos HomeHub Api ${req.baseUrl}`);
});

app.use(bodyParser.json());
app.use("/api/v1/devices", v1DeviceRouter);

app.use("/api/v1/remotes", v1RemoteRouter);

app.listen(PORT, () => {
  console.log(`aXmos HomeHub Api is listening on port ${PORT}`);
  swaggerDocs(app, PORT);
});
