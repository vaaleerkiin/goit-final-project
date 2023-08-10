const ForgetMail = (verifyToken) => `
<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
</head>
<body>
    <p>Dear User,</p>
    <p>We have received a request to reset your password. If you did not initiate this request, please ignore this email.</p>
    <p>If you wish to reset your password, please click the button below:</p>
    <a href="http://localhost:3001/api/users/verify/${verifyToken}" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
    <p>Best regards,</p>
    <p>Task Pro <3</p>
</body>
</html>
`;

module.exports = ForgetMail;
