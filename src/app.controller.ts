import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { log } from './logger/logger';

@Controller()
export class AppController {
  @MessagePattern('emit.topic')
  myFirstTopic(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    // const response = originalMessage.value;

    // console.log(originalMessage.value);
    console.log('Topic Message: ', message);
    log.info('Topic Message: ', JSON.stringify(message, null, 2));
    //
    // console.log('getTopic: ', context.getTopic());
    // console.log('getArgs: ', context.getArgs());
    // console.log('getPartition: ', context.getPartition());
  }

  @MessagePattern('send.topic')
  sendTopic(@Payload() data: any, @Ctx() context: KafkaContext) {
    log.info('receptionData: ', JSON.stringify(data, null, 2));
    return {
      result: '잘 받았습니다. Thanks!',
    };
  }

  @MessagePattern('first')
  microserviceTest(data: string): string {
    const msg = data + ' - first microservice!' + Date.now();
    console.log(msg);
    return msg;
  }

  @MessagePattern('second')
  microserviceTest2(data: string): string {
    const msg = data + ' - second microservice.2!' + Date.now();
    console.log(msg);
    return msg;
  }

  @MessagePattern('third')
  microserviceTest3(data: string): string {
    const msg = data + ' - third microservice.3!' + Date.now();
    console.log(msg);
    return msg;
  }

  @MessagePattern('undefined')
  microserviceTest4(data: string): string {
    const msg = data + ' - microservice.undefined!' + Date.now();
    console.log(msg);
    return msg;
  }
}
