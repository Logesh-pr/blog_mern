import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import "dotenv/config.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

//Database
import connectDatabase from "./config/connectDatabase.js";

//routes
import routes from "./routes/routes.js";

//custom middleware
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/api", routes);

//custom middleware
app.use(errorHandler);

connectDatabase();
app.listen(PORT, () => {
  console.log(`Server running successfully on Port:${PORT}`);
});
