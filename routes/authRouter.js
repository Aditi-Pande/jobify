import { Router } from "express";
const router = Router();
import {login, register, logout} from '../controllers/authController.js'
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max:15,
    message:{msg:'IP limit exceeded, try again in 15 mins'}
})

router.post('/register',apiLimiter ,validateRegisterInput, register); 
router.post('/login',apiLimiter ,validateLoginInput, login); 
router.get('/logout', logout); 

export default router