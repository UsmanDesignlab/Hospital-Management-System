import express from "express";
import { all, one, add, update, destroy } from "./diagnosis.controller";
import { upload } from "./diagnosis.cloudinary";

const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", one);
router.post("/",upload.single("image"), add);
router.patch('/:id',upload.single("image"),update)
router.delete("/:id",destroy)

export default router;