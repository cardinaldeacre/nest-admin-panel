import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

@Injectable()
export class UserRepository {
    connection: Connection = new Connection;

    save() {
        console.info(`Saving user to ${this.connection.getName()} database...`);
    }
}

export function createUserRepository(connection: Connection): UserRepository {
    const repository = new UserRepository();
    repository.connection = connection;
    return repository;
}