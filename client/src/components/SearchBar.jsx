function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="Search a company name or email domain"
      aria-label="Search companies"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default SearchBar
