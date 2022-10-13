const {
  addPost,
  getMemories,
  deleteMemory,
  LikeMemory,
  editPost,
} = require("../controllers/memory-controllers");
const uploadFiles = require("../middleWare/file-upload");
const upload = require("../middleWare/file-upload");
express = require("express");
const router = express.Router();
router.post("/addPost", upload.single("file"), addPost);
router.get("/getMemories", getMemories);
router.post("/deleteMemory", deleteMemory);
router.post("/LikeMemory", LikeMemory);
router.post("/editPostNoImage", editPost);
router.post("/editPostNewImage", upload.single("file"), editPost);

module.exports = router;
