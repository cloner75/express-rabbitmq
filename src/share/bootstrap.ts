import express from 'express';

export default class Bootstrap {
  app: any;
  port: number;

  constructor(serverPort: number) {
    this.app = express();
    this.port = serverPort;
  }

  setSetting() {
    this.app.use(express.json());
  }

  setRoutes(routes: any) {
    this.setSetting();
    for (let route of routes) {
      this.app[route.method](route.url, route.controller);
    }
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`CLN 🚀 ~ file: bootstrap.ts:20 ~ Bootstrap ~ this.app.listen ~ this.port:`, this.port);
    });
  }
}