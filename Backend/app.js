import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// connecting backend with frontend
app.use(
  cors({
    // path of frontend to be connected
    origin: [process.env.FRONTEND_URL],
    // get, post, foot->update, delete method
    methods: ["POST"],
    credentials: true,
  })
);

//
app.use(express.json());
// type of data
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
