import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { APP_SERVICE_NAME, AppController as IAppController, ServiceDescriptor } from 'proto/common';
import { AppService } from './app.service';

/**
 * Controller: App
 */
@Controller()
export class AppController implements IAppController {
  /**
   * Logger instance
   * @private
   */
  private readonly logger = new Logger(AppController.name);

  /**
   * Constructor
   * @param appService  Injected instance of AppService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * gRPC unary method - App.Hello
   */
  @GrpcMethod(APP_SERVICE_NAME)
  hello(): ServiceDescriptor {
    this.logger.log(`[GrpcMethod] App.Hello`);
    return this.appService.getHello();
  }
}
