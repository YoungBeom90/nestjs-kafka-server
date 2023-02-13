import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('first.topic')
  myFirstTopic(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response = originalMessage.value;

    // console.log(originalMessage.value);
    console.log('Topic Message: ', message);
    //
    // console.log('getTopic: ', context.getTopic());
    // console.log('getArgs: ', context.getArgs());
    // console.log('getPartition: ', context.getPartition());

    return response;
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
