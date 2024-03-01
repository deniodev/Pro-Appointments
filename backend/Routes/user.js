import express from "express";
import { 
    updateUser, 
    deleteUser, 
    getAllUser, 
    getSingleUser,
    getUserProfile
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js"; 

const router = express.Router()

router.get('/:id', authenticate, restrict(["client"]), getSingleUser);
router.get('/', authenticate, restrict(["admin"]), getAllUser);
router.put('/:id',  authenticate, restrict(["client"]), updateUser);
router.delete('/:id',  authenticate, restrict(["admin"]), deleteUser);
router.get('/profile/me',  authenticate, restrict(["client"]), getUserProfile);

export default router;