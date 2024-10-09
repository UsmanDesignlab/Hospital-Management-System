import express from "express";
import { all, one, update, destroy } from "./Payment.controller";
import { checkOut } from "./Payment.stripe";

const router = express.Router({ mergeParams: true });

router.get("/", all);
router.get("/:id", one);
router.post("/checkOut", checkOut);
router.patch('/:id',update)
router.delete("/:id",destroy)

export default router;