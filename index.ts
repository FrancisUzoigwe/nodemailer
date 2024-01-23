import express, { Application } from "express";
import env from "dotenv";
import { mainApp } from "./mainApp";
import { testdb } from "./config/testdb";
env.config();

const app: Application = express();
const port = process.env.PORT!;

mainApp(app);
const Server = app.listen(port, () => {
  testdb
});

process.on("uncaughtException", (error) => {
  console.log("Server is shutting down due to an uncaught exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("Server is shutting down due to an unhandled rejection", reason);
  Server.close(() => {
    process.exit(1);
  });
});
