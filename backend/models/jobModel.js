const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        company: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        role: {
            type: String,
            required: [true, 'Please add a role/position'],
        },
        status: {
            type: String,
            enum: ['Applied', 'Pending', 'Interviewing', 'Rejected', 'Approved'],
            default: 'Applied',
        },
        location: {
            type: String,
        },
        jobUrl: {
            type: String,
        },
        notes: {
            type: String,
        },
        appliedDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
