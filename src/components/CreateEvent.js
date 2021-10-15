import React, { useState } from 'react';
import './createEvent.css';

export default function CreateEvent(props) {
    const [proposeEvent,  setProposeEvent] = useState(false);

    const proposeEventContent = () => {
        return (
            <>
                <h2>Propose Event Content</h2>
                <h2>Propose Event Content</h2>

                <h2>Propose Event Content</h2>


                <h2>Propose Event Content</h2>

                <h2>Propose Event Content</h2>

            </>   
        )
    }
    
    return (
        <div className="modal" >
            <div className="profile-name">
                <img src="/profilePictures/profile.png"></img>
                <p>Guy Hawkins</p>
            </div>
            <img src="/icons/close.svg" onClick={props.handleCloseModal}></img>
            <input type="text" placeholder="Enter your message"></input>
            <div className="propose-event">
                <p>Propose an event?</p>
                <label class="switch">
                    <input type="checkbox" onClick={() => setProposeEvent(!proposeEvent)}></input>
                    <span class="slider round"></span>
                </label>
            </div>
            {proposeEvent ? proposeEventContent() : null}
            <button type="button" id="send">Send</button>
        </div>
    )
}