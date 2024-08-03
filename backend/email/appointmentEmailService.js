import {createTransporter} from '../config/nodemailer.js';
export async function sendEmailNewAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD
  );
  const info = await transporter.sendMail({
    from: 'DentalApp <appointments@dentalcompany.com>',
    to: 'admin@dentalcompany.com',
    subject: 'DentalApp - New Appointment',
    text: 'AppDental - New Appointment',
    //* inject all elements inside html
    html: ` <p>Hi: Admin </p>
     <p>Your Appointment is  ready on ${date} at ${time} </p>
 
    
    `,
  });
}

export async function sendEmailUpdateAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD
  );
  const info = await transporter.sendMail({
    from: 'DentalApp <appointments@dentalcompany.com>',
    to: 'admin@dentalcompany.com',
    subject: 'DentalApp -  Appointment Updated',
    text: 'AppDental -  Appointment Updated',
    //* inject all elements inside html
    html: ` <p>Hi: Admin </p>
     <p> An User has been modify an Appointment  </p>
     <p> The new apppointment will be  on ${date} at ${time} </p>
 
    
    `,
  });
}

export async function sendEmailDeleteAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASSWORD
  );
  const info = await transporter.sendMail({
    from: 'DentalApp <appointments@dentalcompany.com>',
    to: 'admin@dentalcompany.com',
    subject: 'DentalApp -  Appointment deleted',
    text: 'AppDental -  Appointment deleted',
    //* inject all elements inside html
    html: ` <p>Hi: Admin </p>
     <p> An User has been delete an Appointment  </p>
     <p> The  apppointment programmed  on ${date} at ${time}, will be available </p>
 
    
    `,
  });
}
