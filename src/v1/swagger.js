import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Basic Meta Informations about Api
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "aXmos HomeHub Api", version: "1.0.0" },
  },
  apis: [
    "./src/v1/routes/remoteRoutes.js",
    "./src/v1/routes/deviceRoutes.js",
    "./src/database/Remote.js",
    "./src/database/Device.js",
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit docs
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make docs in JSON format available
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

export default swaggerDocs;
