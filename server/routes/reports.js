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

module.exports = router;
