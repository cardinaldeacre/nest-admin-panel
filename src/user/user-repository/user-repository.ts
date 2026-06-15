import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {
    console.info('created UserRepository');
    }

    async save(firsName: string, lastName?: string): Promise<User> {
        return this.prismaService.user.create({
            data: {
                first_name: firsName,
                last_name: lastName,
            }
        });
    }
}
