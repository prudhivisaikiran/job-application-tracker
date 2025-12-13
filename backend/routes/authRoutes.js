const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { protect } = require('../middleware/authMiddleware');

// ✅ TEST route (must work in browser)
router.get("/test", (req, res) => {
    res.send("AUTH ROUTES WORKING");
});

const Joi = require('joi');
const validate = require('../middleware/validateMiddleware');

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get('/me', protect, getMe);

module.exports = router;
