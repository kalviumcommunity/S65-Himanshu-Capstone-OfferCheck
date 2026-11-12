const express = require('express');
const Company = require('../models/Company');
const Report = require('../models/Report');

const router = express.Router();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// POST /api/reports adds a report; creates the company if it is new
router.post('/', async (req, res) => {
  const { companyName, emailDomain, offerType, feeAsked, contactEmail, description } = req.body;
  if (!companyName || !description || !['internship', 'job'].includes(offerType)) {
    return res.status(400).json({ error: 'companyName, offerType and description are required' });
  }

  const name = companyName.trim();
  let company = await Company.findOne({ name: new RegExp(`^${escape(name)}$`, 'i') });
  if (!company) company = await Company.create({ name, emailDomain });

  const report = await Report.create({ company: company._id, offerType, feeAsked, contactEmail, description });
  res.status(201).json(report);
});

// PUT /api/reports/:id edits the details of a report
router.put('/:id', async (req, res) => {
  const { offerType, feeAsked, contactEmail, description } = req.body;
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { offerType, feeAsked, contactEmail, description },
      { returnDocument: 'after', runValidators: true }
    );
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/reports/:id removes a report
router.delete('/:id', async (req, res) => {
  const report = await Report.findByIdAndDelete(req.params.id).catch(() => null);
  if (!report) return res.status(404).json({ error: 'Report not found' });
  res.json({ message: 'Report deleted' });
});

module.exports = router;
