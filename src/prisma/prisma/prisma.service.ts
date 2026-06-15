import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit {

    constructor() {
        const adapter = new PrismaMariaDb({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'nest_dasar',
        });

        super({
        adapter,
        });

        console.info('created PrismaModule');
    }

    async onModuleInit() {
        await this.$connect();
    }
}