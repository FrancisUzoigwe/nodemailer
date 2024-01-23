import mongoose from "mongoose";
import env from "dotenv";
env.config();

const mongoString: any = process.env.MongoString;
export const testdb = mongoose.connect(mongoString).then(() => {
  console.log("It's plenty");
});
