import express from "express";
import { all, one, add, update, destroy, allDoctor } from "./Doctor.controller";
import { isDoctor } from "../../helper/isLoggedIn";

const router = express.Router({ mergeParams: true });


router.get("/all", allDoctor);
router.get("/", all);
router.get("/:id", one);
router.post("/", isDoctor, add);
router.patch('/:id', isDoctor, update)
router.delete("/:id", isDoctor, destroy)

export default router;