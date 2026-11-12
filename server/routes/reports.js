const express = require('express');
const { companies, reports } = require('../data/dummy');

const router = express.Router();

// POST /api/reports adds a report; creates the company if it is new
router.post('/', (req, res) => {
  const { companyName, emailDomain, offerType, feeAsked, contactEmail, description } = req.body;
  if (!companyName || !description || !['internship', 'job'].includes(offerType)) {
    return res.status(400).json({ error: 'companyName, offerType and description are required' });
  }

  let company = companies.find((c) => c.name.toLowerCase() === companyName.trim().toLowerCase());
  if (!company) {
    company = { _id: `c${Date.now()}`, name: companyName.trim(), emailDomain: (emailDomain || '').toLowerCase(), website: '' };
    companies.push(company);
  }

  const report = {
    _id: `r${Date.now()}`,
    company: company._id,
    offerType,
    feeAsked: Number(feeAsked) || 0,
    contactEmail,
    description,
  };
  reports.push(report);
  res.status(201).json(report);
});

// PUT /api/reports/:id edits the details of a report
router.put('/:id', (req, res) => {
  const report = reports.find((r) => r._id === req.params.id);
  if (!report) return res.status(404).json({ error: 'Report not found' });

  const { offerType, feeAsked, contactEmail, description } = req.body;
  if (offerType !== undefined && !['internship', 'job'].includes(offerType)) {
    return res.status(400).json({ error: 'offerType must be internship or job' });
  }
  if (offerType !== undefined) report.offerType = offerType;
  if (feeAsked !== undefined) report.feeAsked = Number(feeAsked) || 0;
  if (contactEmail !== undefined) report.contactEmail = contactEmail;
  if (description) report.description = description;
  res.json(report);
});

module.exports = router;
