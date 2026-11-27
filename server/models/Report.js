const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    offerType: { type: String, enum: ['internship', 'job'], required: true },
    feeAsked: { type: Number, min: 0, default: 0 },
    contactEmail: { type: String, trim: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    screenshotUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
