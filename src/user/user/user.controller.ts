import { Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import type {HttpRedirectResponse} from '@nestjs/common';
import type {Request, Response}  from 'express';

@Controller('/api/users')
export class UserController {
    @Post()
    post(): string {
        return 'POST'
    }

    @Get('/sample')
    get(): string {
        return 'GETss'
    }

    @Get('/hello')
    async sayHello(
        @Query('first_name') firstName: string,
        @Query('last_name') lastName: string
    ): Promise<string> {
        return `Hello ${firstName} ${lastName}`;
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

    // @Get('/:id')
    // getById(@Param('id') id: string): string {
    //     return `GETsss ${id}`;
    // }
}
