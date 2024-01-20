import { Application, Request, Response, json } from "express";
import cors from "cors";
import user from "./router/userRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "DELETE", "POST", "PATCH"],
    })
  );
  app.use("/api", user);
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Success!!",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error occured",
        data: error?.message,
      });
    }
  });
};
