import SendGrid from "@sendgrid/mail";
import { ValidationError } from "joi";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, from, replyTo, templateId, data }) => {
  return SendGrid.send({
    to,
    from,
    replyTo,
    template_id: templateId,
    personalizations: [
      {
        to,
        dynamicTemplateData: data,
      },
    ],
  })
    .then(() => {
      return {
        to,
        from,
        templateId,
        data,
      };
    })
    .catch((err) => {
      return Promise.reject(new ValidationError(err.message));
    });
};
