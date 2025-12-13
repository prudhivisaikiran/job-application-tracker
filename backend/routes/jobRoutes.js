const express = require('express');
const router = express.Router();
const {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const Joi = require('joi');
const validate = require('../middleware/validateMiddleware');

const jobSchema = Joi.object({
    company: Joi.string().required(),
    role: Joi.string().required(),
    status: Joi.string().valid('Applied', 'Pending', 'Interviewing', 'Rejected', 'Approved'),
    location: Joi.string().allow(''),
    jobUrl: Joi.string().uri().allow(''),
    notes: Joi.string().allow(''),
});

router.route('/').get(protect, getJobs).post(protect, validate(jobSchema), createJob);
router.route('/:id').delete(protect, deleteJob).put(protect, updateJob).get(protect, getJobById);

module.exports = router;
