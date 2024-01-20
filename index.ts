import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { flexiDB } from "./config/flexiDB";

const app: Application = express();
const port: number = 2345;

mainApp(app);
const Server = app.listen(port, () => {
flexiDB
});

process.on("uncaughtException", (error: Error) => {
  console.log("Server is shutting down due to an uncaught exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("Server is shutting down due to an unhandled rejection", reason);
  Server.close(() => {
    process.exit(1);
  });
});
