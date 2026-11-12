import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import CompanyCard from './components/CompanyCard'
import ReportList from './components/ReportList'
import ReportForm from './components/ReportForm'

function App() {
  const [query, setQuery] = useState('')
  const [companies, setCompanies] = useState([])
  const [selected, setSelected] = useState(null)

  const loadCompanies = () =>
    fetch(`/api/companies?q=${encodeURIComponent(query)}`).then((r) => r.json()).then(setCompanies)

  const openCompany = (id) =>
    fetch(`/api/companies/${id}`).then((r) => r.json()).then(setSelected)

  useEffect(() => {
    loadCompanies()
  }, [query])

  const addReport = async (data) => {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const report = await res.json()
    if (!res.ok) return alert(report.error)
    loadCompanies()
    openCompany(report.company)
  }

  const updateReport = async (id, data) => {
    const res = await fetch(`/api/reports/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) alert((await res.json()).error)
    openCompany(selected._id)
  }

  const deleteReport = async (id) => {
    if (!confirm('Delete this report?')) return
    await fetch(`/api/reports/${id}`, { method: 'DELETE' })
    openCompany(selected._id)
  }

  return (
    <main>
      <h1>Offer Check</h1>
      <p>Search a company before you accept an internship or job offer.</p>
      <SearchBar value={query} onChange={setQuery} />
      {companies.map((c) => (
        <CompanyCard key={c._id} company={c} onOpen={openCompany} />
      ))}
      {selected && (
        <section>
          <h2>{selected.name}</h2>
          <ReportList reports={selected.reports} onUpdate={updateReport} onDelete={deleteReport} />
        </section>
      )}
      <ReportForm onSubmit={addReport} />
    </main>
  )
}

export default App
