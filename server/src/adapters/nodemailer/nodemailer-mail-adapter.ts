import { MailAdapter, SendMailData } from './../mail_adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "3f09d9ce82c5d7",
        pass: "18a19fa7ab0c00"
    }
});

export class NodemailterMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Igor Augusto <igoradf@gmail.com>',
            subject,
            html: body
        })
    }
}