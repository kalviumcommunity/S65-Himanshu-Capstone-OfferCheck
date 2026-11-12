import { useState } from 'react'

function ReportList({ reports, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)

  const saveEdit = (e, id) => {
    e.preventDefault()
    onUpdate(id, Object.fromEntries(new FormData(e.target)))
    setEditingId(null)
  }

  if (reports.length === 0) return <p>No reports yet.</p>
  return (
    <ul>
      {reports.map((r) => (
        <li key={r._id} className="card">
          <strong>
            {r.offerType} · fee asked ₹{r.feeAsked || 0}
          </strong>
          {r.contactEmail && <span>{r.contactEmail}</span>}
          {editingId === r._id ? (
            <form onSubmit={(e) => saveEdit(e, r._id)}>
              <input name="feeAsked" type="number" min="0" defaultValue={r.feeAsked || 0} aria-label="Fee asked" />
              <textarea name="description" defaultValue={r.description} required aria-label="Description" />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <p>{r.description}</p>
              <div>
                <button onClick={() => setEditingId(r._id)}>Edit</button>
                <button onClick={() => onDelete(r._id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ReportList
