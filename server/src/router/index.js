const Router = require("express").Router;
const userController = require("../controllers/user.controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email", "Incorrect email").isEmail(),
  body(
    "password",
    "Password must be longer than 3 and shorter than 12"
  ).isLength({ min: 3, max: 12 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
