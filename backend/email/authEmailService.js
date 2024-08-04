import {createTransporter} from '../config/nodemailer.js';

export async function sendEmailVerification({name, email, token}) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD
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
     <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${token}">Confirm Account</a>
     <p>If you not create this account, you should ignore this message</p>
    
    `,
  });

  console.log('Email Delivery', info.messageId);
}
export async function sendEmailPasswordReset({name, email, token}) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD
  );
  //Send email <></>

  const info = await transporter.sendMail({
    from: 'DentalSalon',
    to: email,
    subject: 'DentalSalon - Reset your Password',
    text: 'AppDental - Reset your Password',
    //* inject all elements inside html
    html: ` <p>Hi: ${name} Reset your Password in DentalCompany </p>
     <p>Follow the next link to generate your new Password</p>
     <a href="${process.env.FRONTEND_URL}/auth/forgot-password/${token}">Reset Password</a>
     <p>If you dont require this , you should ignore this message</p>
    
    `,
  });

  console.log('Email Delivery', info.messageId);
}
