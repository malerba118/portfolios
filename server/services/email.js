import SendGrid from "@sendgrid/mail";
import { ValidationError } from "joi";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, from, subject, text, html }) => {
  return SendGrid.send({
    to,
    from,
    subject,
    text,
    html,
  })
    .then(() => {
      return {
        to,
        from,
        subject,
        text,
      };
    })
    .catch((err) => {
      return Promise.reject(new ValidationError(err.message));
    });
};
