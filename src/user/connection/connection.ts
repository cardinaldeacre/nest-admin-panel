import { Injectable } from '@nestjs/common';

@Injectable()
export class Connection {
    getName(): string {
        return '';
    }
}

@Injectable()
export class MySQLConnection extends Connection {
    getName(): string {
        return 'MySQL';
    }
}

@Injectable()
export class PostgreSQLConnection extends Connection {
    getName(): string {
        return 'PostgreSQL';
    }
}
