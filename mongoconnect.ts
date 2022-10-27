import mongoose from "mongoose";
import * as dotenv from 'dotenv'  
dotenv.config()
const mongoUrl =  process.env.MONGO__URI;

async function startBaseMongo() {
  const uri =
    `${mongoUrl}`;
  try {
    console.log("успешное подключение к БД");
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export {startBaseMongo};
