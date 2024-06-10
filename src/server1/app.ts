import Bootstrap from '../share/bootstrap';
import dotEnv from 'dotenv';
dotEnv.config();

import AMQP from '../share/amqp';
const amqp = new AMQP();

const server = new Bootstrap(Number(process.env.SERVER_ONE_PORT));
amqp.connect();
amqp.consuming('server1');

server.setRoutes(
  [
    {
      method: 'get',
      url: '/',
      controller: (req: any, res: any) => {
        return res.send(`wellcom to server 1`);
      }
    },
    {
      method: 'post',
      url: '/message/send',
      controller: (req: any, res: any) => {
        return res.send(`wellcom to server 1`);
      }
    },
  ]
);

server.startServer();
