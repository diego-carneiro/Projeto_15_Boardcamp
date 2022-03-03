import express, { json } from 'express';
import cors from 'cors';
import router from "./routes/index.js";


const server = express();

server.use(json());
server.use(cors());
server.use(router);

server.listen(4000, () => {
  console.log(`Running at port 4000`);
});