import SendGrid from "@sendgrid/mail";
import { ValidationError } from "joi";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, from, templateId, data }) => {
  return SendGrid.send({
    to,
    from,
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
