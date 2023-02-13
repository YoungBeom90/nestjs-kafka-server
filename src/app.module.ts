import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'first-kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'first', // first-server
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'first-consumer', // first-consumer-server
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
