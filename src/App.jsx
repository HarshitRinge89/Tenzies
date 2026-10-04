import { useState,useRef,useEffect } from 'react'
import './App.css'
import Die from './Die.jsx'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
export default function App() {
  const [dice,setDice]=useState(()=>generateAllNewDice())
  const gameWon=dice.every(die=>die.isHeld) && dice.every(die=>die.value===dice[0].value)
  
  const diceEle=dice.map(obj => 
  <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} hold={()=>hold(obj.id)}/>)
  function generateAllNewDice(){
    return new Array(10)
    .fill(0).
    map(()=> ({
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()      
    }))
  }
  function hold(id){
    setDice(oldDice=>oldDice.map(die=> die.id==id?
        {...die,isHeld:!die.isHeld}: die
      )
    )
  }
  function rollDice(){
    if(!gameWon){
      setDice(oldDice => 
        oldDice.map(die=>
          die.isHeld?die:
          {...die,value:Math.ceil(Math.random()*6)}))
    }
    else setDice(generateAllNewDice())
  }
  return (
    <>
      <main>
        {gameWon && <Confetti/>}
        <div aria-live="polite">
          {gameWon && "Congrats you won!Press 'New Game' to play again!"}
        </div>
        <h1 className='title'>Tenzies</h1>
        <p>Roll until all dice are the same.Click each die to freeze it let it's current value between rolls</p>
        <div className='dice-container'>
          {diceEle}
        </div>
        <button onClick={rollDice}className='roll-button'>{gameWon?"New Game":"Roll"}</button>
      </main>
    </>
  )
}