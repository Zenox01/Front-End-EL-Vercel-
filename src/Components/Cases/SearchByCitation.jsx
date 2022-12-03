import React, { useState, useContext } from 'react'
import { CasesContext } from '../../context/cases.context'
import Cases from '../../Pages/Validation/Cases/ Cases'
import { SearchContainer, SearchBar, SearchButton } from '../../styles/Cases'

const SearchByCitation = () => {
  const { fetchCasesByCitations } = useContext(CasesContext)

  const [year, setYear] = useState("")
  const [journal, setJournal] = useState("")
  const [page, setPage] = useState("")

  const setSearchHandler = () => {
    fetchCasesByCitations(year, journal, page)
    setYear("")
    setJournal("")
    setPage("")
  }

  return (
    <SearchContainer>
        <SearchBar label='Year' variant='outlined' onChange={e => setYear(e.target.value)} value={year}/>
        <SearchBar label='Journal' variant='outlined' onChange={e => setJournal(e.target.value)} value={journal}/>
        <SearchBar label='Page No' variant='outlined' onChange={e => setPage(e.target.value)} value={page}/> 
        <SearchButton variant='contained' onClick={setSearchHandler}>Search</SearchButton>
    </SearchContainer>
  )
}

export default SearchByCitation