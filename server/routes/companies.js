const express = require('express');
const Company = require('../models/Company');
const Report = require('../models/Report');

const router = express.Router();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/companies?q=term searches by name or email domain
router.get('/', async (req, res) => {
  const q = new RegExp(escape(req.query.q || ''), 'i');
  res.json(await Company.find({ $or: [{ name: q }, { emailDomain: q }] }).sort({ name: 1 }));
});

// GET /api/companies/:id returns one company with its reports
router.get('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id).catch(() => null);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  const reports = await Report.find({ company: company._id }).sort({ createdAt: -1 });
  res.json({ ...company.toObject(), reports });
});

module.exports = router;
