import express from "express";
import { updatePro, deletePro, getAllPro, getSinglePro, getProProfile } from "../Controllers/proController.js"; 
import { authenticate, restrict } from "../auth/verifyToken.js"; 
import reviewRouter from "./review.js";

const router = express.Router()

//nested route
router.use('/:proId/reviews', reviewRouter);

router.get('/:id', getSinglePro)
router.get('/', getAllPro)
router.put('/:id', authenticate, restrict(["pro"]), updatePro);
router.delete('/:id',  authenticate, restrict(["pro"]), deletePro);

router.get('/profile/me', authenticate, restrict(['pro']), getProProfile);

export default router;