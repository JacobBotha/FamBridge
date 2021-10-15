import React, { useState } from 'react';
import './createEvent.css';

export default function CreateEvent(props) {
    const [proposeEvent,  setProposeEvent] = useState(false);

    const proposeEventContent = () => {
        return (
            <>
                <div class="date"> <p>Date</p></div>
                   
                <div class="date-section">
                    <div class = "time">
                        <img src="/icons/calender.svg" id="calender"></img>
                        15 Oct 2021
                        <h5 id="timing">Friday</h5>
                    </div>
                    <img src="/icons/line.png" id="border"></img>
                    <div class = "time">
                        <img src="/icons/calender.svg" id="calender"></img>
                        31 Oct 2021
                        <h5 id="timing">Tuesday</h5>
                    </div>
                </div>
                <div class="date"><p>Time</p></div>

                <div class="time-section">
                    <h5>Start Time</h5>
                    <img src="/icons/line.png" id="border-2"></img>
                    <h5>End Time</h5>
                </div>

                    
                
                
                

            

            </>   
        )
    }
    
    return (
        <div className="modal" >
            <div className="profile-name">
                <img src="/profilePictures/user.png"></img>
                <p>Guy Hawkins</p>
            </div>
            <img id="close" src="/icons/close.svg" onClick={props.handleCloseModal}></img>
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