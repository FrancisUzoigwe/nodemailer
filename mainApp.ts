import { Application, Request, Response, json } from "express";
import cors from "cors";
import users from "./router/userRouter";
import morgan from "morgan";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(morgan("dev"));
  app.use(cors());
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Successfully hacked",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error occured while using this endpoint",
        data: error?.message,
      });
    }
  });
  app.use("/api", users);
};
