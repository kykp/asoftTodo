import mongoose from "mongoose";
import * as dotenv from 'dotenv'  
dotenv.config()
const mongoUrl =  process.env.MONGO__URI;

async function startBaseMongo() {
  const uri = `mongodb+srv://kykp:VYFFvDBVwrRPnGHr@cluster0.xtwcw.mongodb.net/Users?retryWrites=true&w=majority`;
  try {
    console.log("успешное подключение к БД");
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export {startBaseMongo};
