import React from 'react';
import "./GameInstance.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSadCry} from '@fortawesome/free-solid-svg-icons';

function GameInstance(props) {

    // Check if the background image is available and display it. Otherwise, display a sad face icon.
    const imgToDisplay = props.background_img
        ? <img src={props.background_img} alt="Smiley face" height="100%" width="100%"/>
        : <FontAwesomeIcon icon={faSadCry} style={{textAlign: "center"}} />

    // Render the component's UI
    return (
        <div className="gameInstanceContainer">
            <div className="gameImageContainer">
                {imgToDisplay}
            </div>
        </div>
    )
}

export default GameInstance;

// The component checks if a background image is available using the background_img prop, and displays it if it is available. Otherwise, it displays a sad face icon.
// The component renders the game image using the imgToDisplay variable, which contains the background image or sad face icon.
// The div elements with class names gameInstanceContainer and gameImageContainer are used to style the component's UI.

