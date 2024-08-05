import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {

  const logger = new Logger('mainGateway')



  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  //usamos excepciones de manera global, mas eficiente
  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(envs.port);

  logger.log('CLIENT-GATEWAY running on port 3000')
}
bootstrap();
