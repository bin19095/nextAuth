import { Resend } from "resend";


console.log("env variables",process.env.RESEND_API_KEY  );
const apiKey = process.env.RESEND_API_KEY;
// if (!process.env.RESEND_API_KEY) {
//   throw new Error("RESEND_API_KEY environment variable is not defined");
// }
const resend = new Resend('re_MbbueWks_JVTXAt46rQJvUxHsKc8agdCo');

export const sendMagicLinkEmail = async (email, link) => {
  if(!email && !link){
    throw new Error(" empty email address");
  }

  try {
   const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Your Magic Link',
      html: `<p>Click <a href="${link}">here</a> to log in.</p>`
    });
    if (error) {
      console.error('Error sending email:', error);
      
    }
  
    console.log("data results ",data);
  } catch (error) {
    console.error('Error sending magic link:', error);
  }
};
