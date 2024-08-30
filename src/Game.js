
import React from "react";
import Confetti from 'react-confetti'
import Box from './Box';

function Game({ boxes, moveCount, sd, newGame, endGame }) {
    const boxItems = boxes.map(box => 
        <Box 
            key={box.id} 
            src={box.src} 
            show={box.show} 
            disabled={box.disabled} 
            held={box.held}
            sd={() => sd(box.id)} 
        />
    )

    return (
        <div>
            <div className="moveCount">
                {endGame && <h1>Congratulations!</h1>}
                <p>Move Count: {moveCount}</p>
                <br />
            </div>
            <div className={endGame ? "ButtonContainer" : "BoxContainer"}>
                {endGame && <Confetti />}
                {endGame ? <button className="NewGame" onClick={newGame}>New Game</button> : boxItems}
            </div>
        </div>
    )
}

export default Game;
