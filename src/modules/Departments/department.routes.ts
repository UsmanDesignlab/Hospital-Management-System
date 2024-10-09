import express from "express";
import { all, one, add, update, destroy, allAdmin } from "./department.controller";
import { isAdmin } from "../../helper/isLoggedIn";


const router = express.Router({ mergeParams: true });

router.get("/admin", allAdmin)
router.get("/", all);
router.get("/:id", one);
router.post("/", isAdmin, add);
router.patch('/:id', isAdmin, update)
router.delete("/:id", isAdmin, destroy)

export default router;