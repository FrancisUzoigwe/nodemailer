import mongoose from "mongoose";

const mongoString: string =
  "mongodb+srv://kossyuzoigwe:kossyuzoigwe@francisuzoigwe.3irljsp.mongodb.net/?retryWrites=true&w=majority";
export const testdb = mongoose.connect(mongoString).then(() => {
  console.log("It's plenty");
});
