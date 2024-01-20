import mongoose from "mongoose";

const flexi: string = "mongodb://127.0.0.1:27017/flexiDB1`";
export const flexiDB = mongoose.connect(flexi).then(() => {
  console.log("Ready for development!");
});


