import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MySQLConnection, PostgreSQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';

@Module({
    controllers: [UserController],
    providers: [
        UserService, 
        {
            provide: Connection,
            useClass: process.env.DB_CONNECTION === 'mysql' ? MySQLConnection : PostgreSQLConnection,
        },{

            provide: MailService,
            useValue: mailService,
        },{
            provide: UserRepository,
            useFactory: (connection: Connection) => createUserRepository(connection),
            inject: [Connection],
        }
        
    ]
})
export class UserModule {}
