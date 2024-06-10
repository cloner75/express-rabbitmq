import amqp from 'amqplib';

export default class AMQP {
  channel: any;
  connection: any;

  async connect() {
    try {
      this.connection = await amqp.connect(String(process.env.AMQP_CONNECTION_STRING));
      console.log('amqp connected');
    } catch (error) {
      console.log(error);
    }
  }

  async send(channelName: string, data: any) {
    console.log(`CLN 🚀 ~ file: amqp.ts:19 ~ AMQP ~ send ~ channelName: %s ~ data: `, channelName, data);
    try {
      await this.connect();
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(channelName);
      await this.channel.sendToQueue(channelName, Buffer.from(JSON.stringify(data)));
      // await this.channel.close();
      // await this.connection.close();
    } catch (err) {
      console.log('send data error => ', err);
    }
  }

  async consuming(channelName: string) {
    await this.connect();
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(channelName);

    this.channel.consume(channelName, (data: any) => {
      console.log(`${channelName} data : ${Buffer.from(data.content)}`);
      this.channel.ack(data);
    });
  }
}