// Dummy data until MongoDB is connected
const companies = [
  { _id: 'c1', name: 'TechNova Solutions', emailDomain: 'technova-hr.com', website: '' },
  { _id: 'c2', name: 'Global Interns Hub', emailDomain: 'gmail.com', website: '' },
];

const reports = [
  {
    _id: 'r1',
    company: 'c1',
    offerType: 'internship',
    feeAsked: 2500,
    contactEmail: 'hr@technova-hr.com',
    description: 'Asked for a registration fee before sending the offer letter.',
  },
  {
    _id: 'r2',
    company: 'c2',
    offerType: 'job',
    feeAsked: 5000,
    contactEmail: 'globalinternshub@gmail.com',
    description: 'Wanted a security deposit for a laptop before joining.',
  },
];

module.exports = { companies, reports };
