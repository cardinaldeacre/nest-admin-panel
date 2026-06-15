import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MySQLConnection, PostgreSQLConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import {  UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [
        UserService, 
        {
            provide: Connection,
            useClass: process.env.DB_CONNECTION === 'mysql' ? MySQLConnection : PostgreSQLConnection,
        },{

            provide: MailService,
            useValue: mailService,
        }, {
            provide: 'EmailService',
            useExisting: MailService,
        }, 
        MemberService,
        UserRepository,
        
    ]
})
export class UserModule {}
