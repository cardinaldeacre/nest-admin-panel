import { Controller, Get, Header, HttpCode, Inject, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import type {HttpRedirectResponse} from '@nestjs/common';
import type {Request, Response}  from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository,
        @Inject('EmailService') private emailService: MailService,
        private memberService: MemberService,
    ) {}

    @Get('/connection')
    async getConnectionName(): Promise<string> {
        this.mailService.send();
        this.userRepository.save();
        this.emailService.send();
        console.info(`MemberService - Connection Name: ${this.memberService.getConnectionName()}`);
        this.memberService.sendEmail();
        
        return this.connection.getName();
    }

    @Post()
    post(): string {
        return 'POST'
    }

    @Get('/sample')
    get(): string {
        return 'GETss'
    }

    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name);
        response.status(200).send('Cookie has been set');
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request) {
        return request.cookies['name']
    }

    @Get('/sample-response')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    getStampleResponse() : Record<string, string> { 
            return{
                data: 'Hello World',
            };
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            statusCode: 302,
            url: '/api/users/sample-response',
        }
    }

    @Get('/view/hello')
    viewHello(@Query('name') name:string, @Res() response: Response) {
        response.render('index.html', { 
            name: name,
            title: 'My App' 
        });
    }

    // @Get('/:id')
    // getById(@Param('id') id: string): string {
    //     return `GETsss ${id}`;
    // }
}
