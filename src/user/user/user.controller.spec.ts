import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import httpMock from 'node-mocks-http';
import { UserService } from './user.service';
import { UserModule } from '../user.module';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], 
      providers: [
        {
            provide: UserService,
            useValue: {},
          },
          {
            provide: Connection,
            useValue: {},
          },
          {
            provide: MailService,
            useValue: {},
          },
          {
            provide: UserRepository,
            useValue: {},
          },
          {
            provide: 'EmailService',
            useValue: {},
          },
          {
            provide: MemberService,
            useValue: {},
          },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
