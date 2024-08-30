
import React, { useEffect, useState } from "react";
import Form from './Form';
import Game from './Game';
import { pokemonEasy, pokemonHard } from "./dataPokemon";

function App() {
  const [formData, setFormData] = useState({difficulty: "easy"})
  const [boxes, setBoxes] = useState(() => shuffle(pokemonEasy))
  const [activeBoxes, setActiveBoxes] = useState([])
  const [disabledCount, setDisabledCount] = useState(1)
  const [game, setGame] = useState(false)
  const [endGame, setEndGame] = useState(false)
  const [moveCount, setMoveCount] = useState(0)

  useEffect(() => {
    const allHeld = boxes.every(die => die.held)
    if (allHeld) {
      setEndGame(true)
    }
  }, [boxes])

  useEffect(() => {
    if(formData.difficulty === "easy") {
      setBoxes(shuffle(pokemonEasy))
    } else if(formData.difficulty === "hard") {
      setBoxes(shuffle(pokemonHard))
    }
  }, [game, formData])

  function shuffle(unshuffled) {
    let shuffled = unshuffled.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

    return shuffled
  }

  function startGame() {
    setGame(true)
  }

  function newGame() {
    setGame(false)
    setEndGame(false)
    setMoveCount(0)
  }

  function sd(id) {
    active(id)
    status(id)
    disabled()
    setMoveCount(() => moveCount + 1)
  }

  function active(id) {
    const newBox = activeBoxes
    newBox.push(id)
    setActiveBoxes(newBox)
  }

  function status(id) {
    setBoxes(oldBoxes => oldBoxes.map(box => {
      return box.id === id ? {...box, show: true} : box
    }))
  }

  function disabled() {
    setDisabledCount(() => disabledCount + 1)

    if(disabledCount === 2){
      setBoxes(oldBoxes => oldBoxes.map(box => {
        return box.show ? box : {...box, disabled: true}
      }))

      const currentBox1 = boxes.filter(box => box.id === activeBoxes[0]);
      const currentBox2 = boxes.filter(box => box.id === activeBoxes[1]);

      setTimeout(function() {
        if (currentBox1[0].value === currentBox2[0].value) {
          setBoxes(oldBoxes => oldBoxes.map(box => {
            return activeBoxes[0] === box.id ? {...box, held: true} : box
          }))
          setBoxes(oldBoxes => oldBoxes.map(box => {
            return activeBoxes[1] === box.id ? {...box, held: true} : box
          }))
        }

        setBoxes(oldBoxes => oldBoxes.map(box => {
          return {...box, show: false, disabled: false}
        }))

        setActiveBoxes([])

        setDisabledCount(1)
      }, 1500);
    }
  }

  function handleFormChange(event) {
    const {name, value} = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  return (
    <div className="App">
    {
      !game ? 
      <Form 
        formData={formData} 
        handleFormChange={handleFormChange} 
        startGame={startGame} 
      /> :
      <Game 
        boxes={boxes} 
        moveCount={moveCount} 
        sd={sd} 
        newGame={newGame} 
        endGame={endGame} 
      />
    }
    </div>
  );
}

export default App;
