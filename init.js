import dotenv from "dotenv";
import app from "./app";

dotenv.config();
import "./db";
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 3000;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT} inis`);

app.listen(PORT, handleListening);
