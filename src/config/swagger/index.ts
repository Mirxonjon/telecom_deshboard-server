import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Dashboard WFM')
  .setVersion('1.1')
  .build();
