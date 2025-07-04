import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/app.config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const port = config().port;

  await app.listen(port, () => console.log(`Listening on ${port}...`));
}
bootstrap();
