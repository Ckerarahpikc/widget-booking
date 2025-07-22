import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '185.163.46.22',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'reserv_test',
      password: process.env.DB_PASSWORD || '5yA6&BR44M&Q',
      database: process.env.DB_NAME || 'easyreserv_test',
      autoLoadEntities: true,
      synchronize: true, // ⚠️
    }),
    WidgetModule,
  ],
})
export class AppModule {}
