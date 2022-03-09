import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { ServiceDescriptor } from 'proto/common';

/**
 * Service: App
 */
@Injectable()
export class AppService {
  /**
   * Service descriptor
   * @private
   */
  private readonly serviceDescriptor: ServiceDescriptor;

  /**
   * Constructor
   * @param configService Injected instance of ConfigService
   */
  constructor(private readonly configService: ConfigService) {
    const file = fs.readFileSync('package.json', { encoding: 'utf8' });
    const data = JSON.parse(file);
    this.serviceDescriptor = {
      name: data.name ?? 'boilerplate-microservice-node',
      stage: configService.get<string>('NODE_ENV', 'development'),
      version: data.version ?? 'unknown',
    };
  }

  /**
   * Say hello
   */
  getHello(): ServiceDescriptor {
    return this.serviceDescriptor;
  }
}
