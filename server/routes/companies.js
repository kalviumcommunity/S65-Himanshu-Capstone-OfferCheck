const express = require('express');
const { companies, reports } = require('../data/dummy');

const router = express.Router();

// GET /api/companies?q=term searches by name or email domain
router.get('/', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const result = companies.filter(
    (c) => c.name.toLowerCase().includes(q) || c.emailDomain.includes(q)
  );
  res.json(result);
});

// GET /api/companies/:id returns one company with its reports
router.get('/:id', (req, res) => {
  const company = companies.find((c) => c._id === req.params.id);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  res.json({ ...company, reports: reports.filter((r) => r.company === company._id) });
});

module.exports = router;
