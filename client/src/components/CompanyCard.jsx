function CompanyCard({ company, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(company._id)}>
      <strong>{company.name}</strong>
      <span>{company.emailDomain}</span>
    </button>
  )
}

export default CompanyCard
