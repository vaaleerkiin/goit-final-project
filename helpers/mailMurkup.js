const mailMurkup = (issueDescription, from) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Technical Support - Issue Report</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e9e9e9; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <h1 style="text-align: center; color: #007BFF; margin-top: 0;">Technical Support - Issue Report</h1>
    <p>Hello Support Team, ⁣</p>
    <p>I am writing to report an issue I encountered on your website. Below are the details of the problem:</p>
    <p><strong>Issue Description:</strong></p>
    <p>${issueDescription}</p>
    <p>I would appreciate it if you could look into this matter as soon as possible and provide assistance in resolving the issue.</p>
    <p>Thank you for your prompt attention to this matter.</p>
    <p>Best regards,<br>${from}</p>
  </div>
</body>
</html>
`;

module.exports = mailMurkup;
