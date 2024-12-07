import React, { useState, useEffect } from 'react'
import './App.css'
import Search from "./Search"
import Results from "./Results"
import Details from "./Details"
import DailyPuzzle from "./DailyPuzzle"
import { fetchPlayerById, fetchPlayers } from '../services/searchService'
import { useAuthentication } from '../services/authService'
import { SignIn, SignOut } from './Auth'
import { getMyFavorites } from '../services/favoritesService'


export default function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [players, setPlayers] = useState([])
  const[playerId, setPlayerId] = useState(null)
  const [playerDetails, setPlayerDetails] = useState(null)
  const user = useAuthentication()

  useEffect(() => {
    setPlayerDetails(null)
      fetchPlayers(searchTerm).then(setPlayers)
  }, [searchTerm])

  useEffect(() => {
    fetchPlayerById(playerId).then(setPlayerDetails)
  }, [playerId])

  function showFavorites() {
    setSearchTerm("")
    setPlayerId(null)
    getMyFavorites("", true).then(setPlayers)
  }



  return (
    <>
      <Search setter={setSearchTerm} />
      <button onClick={showFavorites} >see favorites</button>
      {playerDetails ? (
        <Details user={user} details={playerDetails} />
      ) : (
        <Results players={players} action={setPlayerDetails}/>
      )}

      <div className="App">
        <header>
          <div className="header-title">
            <h1>ChessMate</h1>
            <h2>
              A <a href="https://www.chess.com" target="_blank" rel="noopener noreferrer">Chess.com</a> data site
            </h2>
          </div>
          {!user ? <SignIn /> : <SignOut />}
        </header>
      </div>
    </>
  );
}
