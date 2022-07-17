import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from "express";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    ) {}

  async sendDemoEmail() {
    return await this.mailerService.sendMail({
      to: ['dibyasau@gmail.com'],
      subject: 'Welcome to Nice App! Confirm your Email 2',
      template: './testing',
      context: {
        name: 'dibya',
        url: `https://docs.nestjs.com/`,
      },
    });
  }


   /*
  async sendPaymentReceipt(req: AuthRequest<{invoice: PosInvoice, transaction: PayinTransaction}>, res: Response) {
    const response = await this.baseService.userClient(req.token, req.email, res).get<JavaBaseResponse<any>>(`/${RoutesEnum.MERCHANT_POS_PROFILE}`, {headers: {merchantId: req.user.merchantDetail.merchantId}});
    const data = response.data.resultObject;
    let profile: MerchantPOSProfile;    
    if (data.length) {
      profile = data.find((data) => data.profileId === req.body.invoice.profileId);
    }

    return this.mailerService.sendMail({
      to: [req.body.invoice.custEmail],
      subject: `${req.body.transaction.merchantDetail.merchantName.toUpperCase()} Payment Receipt`,
      from: '"No Reply - B4U POS" <support@b4upos.com>',
      template: './pos-receipt',
      attachments: [{
          filename: 'B4u-Logo.png',
          path: path.resolve(__dirname, '../../assets/B4u-Logo.png'),
          cid: 'b4u-logo',
      },{
        path: profile.logo,
        cid: 'merchant-logo',
        filename: `Merchant-logo.${profile.logo.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0].split("/")[1]}`,
      }],
      context: {
        invoice: req.body.invoice,
        transaction: req.body.transaction,
        profile: profile,
        currency: req.user.merchantDetail.currencyChoice,
      },
    })
  }

  */


  // For public module
  /*
  async sendGetStartedEmailToAdmin(getStartedData: GetStartedDTO){

    const adminEmails = this.configService.get<string>("FIN_EMAIL_ADMIN_EMAILS");
    const adminEmailsArray = adminEmails.split(',');
    
    return await this.mailerService.sendMail({
      to: adminEmailsArray,
      subject: 'Contact us',
      template: './get-started',
      context: {
        data: getStartedData,
      },
    });
  }
  */
}