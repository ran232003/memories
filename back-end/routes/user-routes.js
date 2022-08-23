const { addUser, login } = require("../controllers/user-controllers");

express = require("express");
const router = express.Router();

router.post("/newUser", addUser);
router.post("/login", login);

module.exports = router;
