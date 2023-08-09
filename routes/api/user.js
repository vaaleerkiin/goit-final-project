const express = require("express");
const { shema } = require("../../models/user");
const ctrl = require("../../controlers/users");
const { validateBody, Authenticate, upload } = require("../../middlewares");
const router = express.Router();

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

router.get("/verify/:verificationToken", ctrl.verifyToken);

router.patch(
  "/theme",
  Authenticate,
  validateBody(shema.updateThemeSchema),
  ctrl.theme
);

router.post("/help", validateBody(shema.helpShema), ctrl.needHelp);

router.post("/google", ctrl.google);

module.exports = router;
