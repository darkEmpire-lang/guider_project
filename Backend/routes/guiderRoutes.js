import express from "express";
import { createGuider, getGuiders, getGuiderById, deleteGuider,updateGuider } from "../controllers/guiderController.js";
import upload from "../middleware/multer.js";


const router = express.Router();

router.post("/", upload.single("guiderpic"), createGuider);
router.get("/", getGuiders);
router.get("/:id", getGuiderById);
router.delete("/:id", deleteGuider);
router.put("/:id", upload.single("guiderpic"), updateGuider);

export default router;
