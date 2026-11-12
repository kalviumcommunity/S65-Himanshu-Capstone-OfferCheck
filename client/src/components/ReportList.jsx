function ReportList({ reports }) {
  if (reports.length === 0) return <p>No reports yet.</p>
  return (
    <ul>
      {reports.map((r) => (
        <li key={r._id} className="card">
          <strong>
            {r.offerType} · fee asked ₹{r.feeAsked || 0}
          </strong>
          {r.contactEmail && <span>{r.contactEmail}</span>}
          <p>{r.description}</p>
        </li>
      ))}
    </ul>
  )
}

export default ReportList
