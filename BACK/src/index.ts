import cookieParser from 'cookie-parser';
import cors from "cors";
import express from "express";
import "reflect-metadata";
import { routers } from "./routes";

const main = (): void => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());
  server.use(cors({ origin: true, credentials: true }));
  server.use("/api", ...routers);
  server.listen(process.env.PORT || 8080, () => {
    console.log(`Server started listening on ${process.env.PORT || 8080}`);
  });
};
main();
