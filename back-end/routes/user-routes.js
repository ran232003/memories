const {
  addUser,
  login,
  googleLogin,
  googleSignup,
} = require("../controllers/user-controllers");

express = require("express");
const router = express.Router();

router.post("/newUser", addUser);
router.post("/login", login);
router.post("/googleLogin", googleLogin);
router.post("/googleSignup", googleSignup);

module.exports = router;
