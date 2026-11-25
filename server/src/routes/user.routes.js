import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/user.controller";

const router = Router();

router.get("/me", getMyProfile);
router.patch("/me", updateMyProfile);

export default router;
