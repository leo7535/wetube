import app from "./app";
import dotenv from "dotenv";
import "./db";
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT} inis`);

app.listen(PORT, handleListening);
