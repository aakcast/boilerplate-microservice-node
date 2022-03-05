import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ExceptionFilter } from './core/filters/rpc-exception.filter';

/**
 * Microservice entry point
 */
async function bootstrap() {
  // Create gRPC server
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    // TODO: Enable this
    // transport: Transport.GRPC,
    // options: {
    //   url: '[::]:7001',
    //   protoPath: ['proto/user.proto'],
    //   package: 'aakcast.user',
    // },
  });

  // Set global RPC exception filter
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen();
}
bootstrap();
