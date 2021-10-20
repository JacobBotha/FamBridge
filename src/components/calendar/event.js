import React, { useState, useEffect } from 'react';
import './event.css';
import Avatar from '@mui/material/Avatar';

const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

export default function Event(props) {
    const [eventIndex, setEventIndex] = useState(0);
    const [currentEvent, setCurrentEvent] = useState(null);

    const handleClose = () =>  {
        setCurrentEvent(null);
        setEventIndex(0);
        props.closeEvent();
    }

    useEffect(() => {
        if(props.events.length < 1) {
            setCurrentEvent(null);
            return;
        }

        setCurrentEvent(props.events[eventIndex]);
    }, [props.events, eventIndex])

    const nextEvent = () => {
        if (eventIndex + 1 >= props.events.length) return;
        
        setEventIndex(eventIndex + 1);
    }

    const prevEvent = () => {
        if (eventIndex <= 0) return;

        setEventIndex(eventIndex - 1)
    }

    const joinEvent = () => {
        if(props.events.length < 1) {
            return;
        }

        props.handleJoinEvent(props.events[eventIndex]);
    }

    const goingText = () => {
        let going = ""

        if(props.events.length < 1 || props.events === undefined || props.events === null) {
            return going;
        }
         
        let persons = props.events[eventIndex].Going
        console.log("Before: ", persons);
        persons = persons.filter( (person) => person !== 0);
        console.log("After: ", persons);

        for (let i in persons) {
            let id = persons[i];
            console.log("Going ID: ", id);
            let friend = props.friends.filter((friend) => friend.Id === id);

            if (parseInt(i)+1 >= persons.length && persons.length > 1) {
                going += " and " + friend[0].Name;
            } else if (going === "") {
                going += friend[0].Name;
            } else {
                going += ", " + friend[0].Name;
            }
        }
        console.log(persons);

        if (persons.length === 1) {
            going += " is going!";
        } else if(persons.length > 1) {
            going += " are going!";
        }

        return going;
    }

    const isGoing = () => {
        // if(props.events.length < 1 || props.events === undefined || props.events === null) {
        //     return false;
        // }

        if (currentEvent === null) return false;

        let persons = props.events[eventIndex].Going

        if (persons.includes(0)) {
            return true;
        }

        return false;
    }

    const getJoinButtonClassName = () => {
        if(props.events.length < 1 || props.events === undefined || props.events === null) {
            return "calModalJoin";
        }

        if (isGoing()) {
            return "calModalJoined";
        } 

        return "calModalJoin";
    }

    const convertMinutes = (date) => {
        if(date.getMinutes() < 10) {
            return "0" + date.getMinutes();
        }

        return date.getMinutes();
    }

    const getCurrentEventTime = (date) => {
        let startTime = new Date(currentEvent.StartTime);
        let endTime = new Date(currentEvent.EndTime);

        let startStr =  startTime.getHours() + ":" + convertMinutes(startTime);
        let endStr = endTime.getHours() + ":" + convertMinutes(endTime);

        if (startTime.getDate() < props.date) {
            startStr = "Yesterday";
        }

        if (endTime.getDate() > props.date) {
            endStr = "Tomorrow";
        }

        if (endTime.getDate() > props.date && startTime.getDate() < props.date) {
            return "All Day";
        }

        return startStr + " - " + endStr;
    }

    return (
    <div className="modal-container">
        <div className="calModal">
            <img className="closeEvent" src="/icons/close.svg" alt="close" onClick={handleClose}></img>
            <div id="calModalHeading">
                <h1 id="calModalmonthText"> {months[props.month]} </h1><h1 id="calModalDateText">{props.date} </h1>
                <div id="calModelArrows">
                    <img onClick={prevEvent} src="/icons/arrowLeft.svg" className={(eventIndex === 0 ? "calModalArrowsInactive" : "")} id="calModalLeftArrow" alt="leftArrow"/>
                    <img onClick={nextEvent} src="/icons/arrowRight.svg" className={(eventIndex + 1 >= props.events.length ? "calModalArrowsInactive" : "")} id="calModalRightArrow" alt="RightArrow"/>
                </div>
                <h2 id="locationText"><i>{currentEvent === null ? "" : getCurrentEventTime()}</i></h2>
                <h3 id="timeText"><i>{currentEvent === null ? "" : currentEvent.Name}</i></h3>
            </div>
            <div className="calEventsParticipants">
                {currentEvent === null ? "none" : props.events[eventIndex].Going.map((id) => {
                    let friend = props.friends.filter((friend) => friend.Id === id);
                    console.log("ID: ", id, "FRIEND: ", friend)
                    if (id === 0) {
                        return "";
                    } else {
                        return (
                            <Avatar
                            key={id}
                            alt={friend[0].Name}
                            src={friend[0].Profile}
                            className="eventGoingPersonImg"
                            />
                        )
                    }
                })}
            </div>
            <h4 id="participantsText">{goingText()}</h4>

            <button onClick={joinEvent} className={getJoinButtonClassName()}> 
                {/* <img src="joinButtonwhiteFilled.png" alt="joinIcon" id="calModalJoinIcon"/> */}
                {isGoing() ? "Joined" : "Join"}
            </button>
        </div>
    </div>
    )
}