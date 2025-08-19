import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Token } from './tokens/entities/token.entity';
import { Task } from './tasks/entities/task.entity';
import { BasicInfo } from './basic-info/entities/basic-info.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'process_manager_db',
    synchronize: false,
    logging: true,
    entities: [User, Token, Task, BasicInfo],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
});

export default AppDataSource;
