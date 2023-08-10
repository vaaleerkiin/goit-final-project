const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    res.status(404).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=http://localhost:3000/project-magic-task-manager/">
</head>
<body>
    <p>If you are not redirected, click <a href="http://localhost:3000/project-magic-task-manager/">here</a>.</p>
</body>
</html>
  `);
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
  });
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=http://localhost:3000/project-magic-task-manager/auth/resetePassword?verificationToken=${verificationToken}">
</head>
<body>
    <p>If you are not redirected, click <a href="http://localhost:3000/project-magic-task-manager/auth/resetePassword?verificationToken=${verificationToken}">here</a>.</p>
</body>
</html>
  `);
};

module.exports = verifyToken;
