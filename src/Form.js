
import React from "react";

function Form({ formData, handleFormChange, startGame }) {
    return (
        <div className="Form">
            <h1>Card Matching</h1>
            <br />

            <label htmlFor="difficulty">Difficulty</label>
            <select 
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleFormChange}
            >
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
            </select>
            <br />

            <br />
            <button className="NewGame" onClick={startGame}>Start Game</button>
        </div>
    );
}

export default Form;
