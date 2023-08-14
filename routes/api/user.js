const express = require("express");
const { shema } = require("../../models/user");
const ctrl = require("../../controlers/users");
const {
  validateBody,
  Authenticate,
  upload,
  passport,
} = require("../../middlewares");
const router = express.Router();

const { CLIENT_URL } = process.env;

router.post("/register", validateBody(shema.registerShema), ctrl.register);

router.post("/login", validateBody(shema.loginShema), ctrl.login);

router.post("/logout", Authenticate, ctrl.logout);

router.get("/current", Authenticate, ctrl.current);

router.patch(
  "/edit",
  Authenticate,
  upload.single("avatar"),
  validateBody(shema.editShema),
  ctrl.editUser
);

router.post("/verify", validateBody(shema.verifyShema), ctrl.verify);

router.post(
  "/forgetpassword",
  validateBody(shema.verifyShema),
  ctrl.forgetPass
);

router.post(
  "/resetpassword/:verificationToken",
  validateBody(shema.resetShema),
  ctrl.resetPassword
);

router.get("/verify/:verificationToken", ctrl.verifyToken);

router.patch(
  "/theme",
  Authenticate,
  validateBody(shema.updateThemeSchema),
  ctrl.theme
);

router.post("/help", validateBody(shema.helpShema), ctrl.needHelp);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/project-magic-task-manager/welcome`,
  }),
  ctrl.google
);

router.post("/refresh", validateBody(shema.refreshSchema), ctrl.refresh);

module.exports = router;
