import Bootstrap from '../share/bootstrap';
import dotEnv from 'dotenv';
dotEnv.config();

import AMQP from './../share/amqp';

const amqp = new AMQP();

const server = new Bootstrap(Number(process.env.SERVER_TWO_PORT));
amqp.connect();
server.setRoutes(
  [
    {
      method: 'get',
      url: '/',
      controller: (req: any, res: any) => {
        return res.send(`wellcom to server 2`);
      }
    },
    {
      method: 'post',
      url: '/message/send',
      controller: async (req: any, res: any) => {
        const {
          channel,
          data
        } = req.body;
        await amqp.send(channel, data);
        return res.send(`wellcom to server 1`);
      }
    },
  ]
);

server.startServer();
