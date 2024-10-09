import nodemailer from 'nodemailer';


// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'htimest@gmail.com', // Your email
    pass: 'cauhagbzxnzontyz', // Your email password
  },
});

// Function to send email
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: 'htimest@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};