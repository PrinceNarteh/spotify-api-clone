import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from 'seed/seed.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  const config = new DocumentBuilder()
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone Api Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
