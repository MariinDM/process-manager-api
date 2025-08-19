import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { TasksModule } from './tasks/tasks.module';
import { BasicInfoModule } from './basic-info/basic-info.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'process_manager_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      migrationsRun: true,
      logging: true,
    }),
    UsersModule,
    TokensModule,
    TasksModule,
    BasicInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
