import {createTransporter} from '../config/nodemailer.js';

export async function sendEmailVerification({name, email, token}) {
  const transporter = createTransporter(
    'sandbox.smtp.mailtrap.io',
    2525,
    'de51551b6c5067',
    'c934c5482c7b34'
  );
  //Send email <></>

  const info = await transporter.sendMail({
    from: 'DentalSalon',
    to: email,
    subject: 'DentalSalon - Confirm your account',
    text: 'AppDental - Confirm your Account',
    //* inject all elements inside html
    html: ` <p>Hi: ${name} Confirm your account in DentalCompany </p>
     <p>Your Account is almost ready, just need to confirm in the next link</p>
     <a href="http://localhost:8001/api/auth/verify/${token}">Confirm Account</a>
     <p>If you not create this account, you should ignore this message</p>
    
    `,
  });

  console.log('Email Delivery', info.messageId);
}
