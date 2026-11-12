function ReportForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(Object.fromEntries(new FormData(e.target)))
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a fake offer</h2>
      <input name="companyName" placeholder="Company name" required />
      <input name="emailDomain" placeholder="Email domain, e.g. gmail.com" />
      <select name="offerType">
        <option value="internship">Internship</option>
        <option value="job">Job</option>
      </select>
      <input name="feeAsked" type="number" min="0" placeholder="Fee asked (₹)" />
      <input name="contactEmail" type="email" placeholder="Contact email" />
      <textarea name="description" placeholder="What happened?" required />
      <button type="submit">Submit report</button>
    </form>
  )
}

export default ReportForm
