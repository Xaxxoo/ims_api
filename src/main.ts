import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global serialization (excludes @Exclude() fields like password)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  // CORS
  app.enableCors();
  
  await app.listen(3000);
  console.log('Factory Inventory API running on http://localhost:3000');
}
bootstrap();