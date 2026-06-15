import { Body, Controller, Get, Header, HttpCode, HttpException, Inject, Param, ParseIntPipe, Post, Query, Redirect, Req, Res, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import type {HttpRedirectResponse} from '@nestjs/common';
import type {Request, Response}  from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { ValidationFilter } from '../../validation/validation.filter';
import { LoginUserRequest, loginUserRequestValidation } from '../../model/login.model';
import { TimeInterceptor } from '../../time/time.interceptor';
import type { User } from '@prisma/client';
import { Auth } from '../../auth/auth.decorator';

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

    @Get('/current')
    current(@Auth() user: User): Record<string, any> {
        return {
            data: `Hello ${user.first_name} ${user.last_name}`,
        }
    }

    @UseFilters(ValidationFilter)
    @Post('/login')
    @Header('Content-Type', 'application/json')
    @UseInterceptors(TimeInterceptor)
    login(@Query('name') name: string, @Body() loginUserRequest: LoginUserRequest) {
        return{
            data: `Hello ${name}`,
        }
    }

    @Get('/connection')
    async getConnectionName(): Promise<string> {
        this.mailService.send();
        this.emailService.send();
        console.info(`MemberService - Connection Name: ${this.memberService.getConnectionName()}`);
        this.memberService.sendEmail();
        
        return this.connection.getName();
    }

    @Get('/hello')
    @UseFilters(ValidationFilter)
    sayHello(@Query('name') name: string): string {
        return this.service.sayHello(name);
    }

    @Get('/create')
    async create(
        @Query('first_name') firstName: string, 
        @Query('last_name') lastName: string
    ): Promise<String> {
        if (!firstName) {
            throw new HttpException({
                code: 400,
                message: 'First name is required'
            }, 400);
        }

        await this.userRepository.save(firstName, lastName);
        return 'User created successfully';
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

    @Get('/:id')
    getById(@Param('id', ParseIntPipe) id: number): string {
        return `GETsss ${id}`;
    }
}
