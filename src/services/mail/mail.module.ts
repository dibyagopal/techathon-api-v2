import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

const helpers = { 
  ToFixed: function(value) {
    if (!value) return value;
    return Number(value).toFixed(2);
  },
}

// const smtpConfig = {
//   host: 'smtp.mailtrap.io',
//   port: 587,
//   userName: 'e6f87477679498',
//   userPassword: '0a552d9d1f51d3',
//   from: '"No Reply" <dibyasau@gmail.com>',
//   secure: false
// }

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  userName: 'squaretheknowledge@gmail.com',
  userPassword: 'Viper@123$$',
  from: '"No Reply" <dibyasau@gmail.com>',
  secure: false
}

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        auth: {
            user: smtpConfig.userName,
            pass: smtpConfig.userPassword,
        },
      },
      defaults: {
        from: smtpConfig.from,
      },
      template: {
        dir: join(__dirname, 'templates/pages'),
        adapter: new HandlebarsAdapter(helpers),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: join(__dirname, 'templates/layout'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}