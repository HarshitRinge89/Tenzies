import { useState } from 'react'
import './App.css'
import Die from './Die.jsx'
import {nanoid} from "nanoid"
export default function App() {
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
    setDice(generateAllNewDice())
  }
  const [dice,setDice]=useState(generateAllNewDice())
  const diceEle=dice.map(obj => 
  <Die key={obj.id} value={obj.value} isHeld={obj.isHeld} hold={()=>hold(obj.id)}/>)
  return (
    <>
      <main>
        <div className='dice-container'>
          {diceEle}
        </div>
        <button onClick={rollDice}className='roll-button'>Roll</button>
      </main>
    </>
  )
}