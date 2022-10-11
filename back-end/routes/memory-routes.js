const {
  addPost,
  getMemories,
  deleteMemory,
} = require("../controllers/memory-controllers");
const uploadFiles = require("../middleWare/file-upload");
const upload = require("../middleWare/file-upload");
express = require("express");
const router = express.Router();
router.post("/addPost", upload.single("file"), addPost);
router.get("/getMemories", getMemories);
router.post("/deleteMemory", deleteMemory);

module.exports = router;
