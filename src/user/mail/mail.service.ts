import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    send() {
        console.log('Sending mail...');
    }
}

export const mailService = new MailService();
