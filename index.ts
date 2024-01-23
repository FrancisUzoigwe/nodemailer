import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { testdb } from "./config/testdb";

const app: Application = express();
const port = 2345;

mainApp(app);
const Server = app.listen(port, () => {
  testdb;
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
