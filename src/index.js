import express, { json } from 'express';
import cors from 'cors';
import router from "./routes/index.js";

const server = express();

server.use(json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT, () => {
  console.log(`Running at port ${process.env.PORT}`);
});