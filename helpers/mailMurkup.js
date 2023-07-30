const { BASE_URL } = process.env;

const mailMurkup = (verificationToken) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 1px solid #e9e9e9; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <h1 style="text-align: center; color: #007BFF; margin-top: 0;">Email Verification</h1>
    <p>Hello,</p>
    <p>Thank you for registering on our website. To complete the registration process, please confirm your email address by clicking the button below:</p>
    <p style="text-align: center;">
      <a href="${BASE_URL}/api/users/verify/${verificationToken}" style="display: inline-block; padding: 12px 30px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; letter-spacing: 1px;">Verify Email Address</a>
    </p>
    <p>If you didn't sign up on our website, please disregard this email.</p>
    <p>Best regards,<br>The Team at example.com</p>
  </div>
</body>
</html>
`;

module.exports = mailMurkup;
