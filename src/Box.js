
import React from "react";

function Box({ src, show, disabled, held, sd }) {
    if(held) {
      return(
        <button className="BoxHeld"></button>
      );
    } else {
      return(
        <button className="Box" disabled={disabled} onClick={sd}>{show ? <img alt="" src={src}  width="100%"></img> : ""}</button>
      );
    }
}

export default Box;
