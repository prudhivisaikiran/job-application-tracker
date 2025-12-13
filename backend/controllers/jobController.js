const Job = require('../models/jobModel');
const User = require('../models/userModel');

// @desc    Get jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
    try {
        const { status, search, sort, page = 1, limit = 10 } = req.query;

        // Validation
        const allowedStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
        if (status && !allowedStatuses.includes(status)) {
            res.status(400).json({
                message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}`,
            });
            return;
        }

        const allowedSorts = [
            'createdAt_desc',
            'createdAt_asc',
            'appliedDate_desc',
            'appliedDate_asc',
        ];
        if (sort && !allowedSorts.includes(sort)) {
            res.status(400).json({
                message: `Invalid sort. Allowed: ${allowedSorts.join(', ')}`,
            });
            return;
        }

        // Build Query
        const queryObject = {
            user: req.user.id,
        };

        if (status) {
            queryObject.status = status;
        }

        if (search) {
            queryObject.$or = [
                { company: { $regex: search, $options: 'i' } },
                { role: { $regex: search, $options: 'i' } },
            ];
        }

        let result = Job.find(queryObject);

        // Sorting
        if (sort === 'createdAt_asc') {
            result = result.sort('createdAt');
        } else if (sort === 'appliedDate_desc') {
            result = result.sort('-appliedDate');
        } else if (sort === 'appliedDate_asc') {
            result = result.sort('appliedDate');
        } else {
            // Default
            result = result.sort('-createdAt');
        }

        // Pagination
        const pageNum = Number(page) >= 1 ? Number(page) : 1;
        const limitNum = Number(limit) >= 1 ? Number(limit) : 10;
        const finalLimit = limitNum > 50 ? 50 : limitNum; // Max 50
        const skip = (pageNum - 1) * finalLimit;

        result = result.skip(skip).limit(finalLimit);

        const jobs = await result;
        const totalJobs = await Job.countDocuments(queryObject);

        res.status(200).json({
            jobs,
            page: pageNum,
            limit: finalLimit,
            totalJobs,
            totalPages: Math.ceil(totalJobs / finalLimit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Private
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        // Check for user
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the job user
        if (job.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Set job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
    try {
        if (!req.body.company || !req.body.role) {
            res.status(400).json({ message: 'Please add company and role' });
            return;
        }

        const job = await Job.create({
            company: req.body.company,
            role: req.body.role,
            user: req.user.id,
            status: req.body.status,
            location: req.body.location,
            jobUrl: req.body.jobUrl,
            notes: req.body.notes,
            appliedDate: req.body.appliedDate,
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        // Check for user
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the job user
        if (job.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }

        // Check for user
        if (!req.user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }

        // Make sure the logged in user matches the job user
        if (job.user.toString() !== req.user.id) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await job.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
};
