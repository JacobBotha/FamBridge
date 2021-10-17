import React, { useState } from 'react';
import './createEvent.css';
import DateAdapter from '@mui/lab/AdapterDateFns';
// import frLocale from 'date-fns/locale/fr';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
// import { KeyboardReturnOutlined, PinDropRounded } from '@mui/icons-material';

export default function CreateEvent(props) {
    const [proposeEvent,  setProposeEvent] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [eventName, setEventName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const handleClose = () => {
        setProposeEvent(false);
        setStartDate(null);
        setEndDate(null);
        setStartTime(null);
        setEndTime(null);
        setEventName("");
        setErrorMessage(null);
        props.handleCloseModal();
    }

    const submitEvent = () => {
        console.log(startTime);
        if (eventName === null && !proposeEvent) {
            setErrorMessage("Your status update is blank!")
            return;
        }

        if (!proposeEvent) {
            props.updateItems({
                isStatus: true,
                Name: eventName,
                Photo: null,
                CreatedBy: 0,
                Time: new Date().toJSON()
            });
            handleClose();
            return;
        }

        if (eventName === null && proposeEvent) {
            setErrorMessage("Please enter a name for the event.");
            return;
        }

        if (startDate === null || endDate === null || startTime === null || endTime === null) {
            setErrorMessage("Make sure you have set a start and end date and time.")
            return;
        }
        
        const startDateTime = new Date(
            startDate.getFullYear(), 
            startDate.getMonth(), 
            startDate.getDate(), 
            startTime.getHours(), 
            startTime.getMinutes()
        );

        const endDateTime = new Date(
            endDate.getFullYear(), 
            endDate.getMonth(), 
            endDate.getDate(), 
            endDate.getHours(), 
            endDate.getMinutes()
        );

        const item = {
            isStatus: proposeEvent,
            StartTime: startDateTime,
            EndTime: endDateTime,
            Time: new Date().toJSON(),
            Name: eventName,
            CreatedBy: 0,
        }

        props.updateItems(item);
        handleClose();
    }

    const proposeEventContent = () => {
        return (
            <>
                <div class="date"> <p className="text-style">Date</p></div>
                   
                <div class="date-section">
                    <div class = "time">
                        <LocalizationProvider dateAdapter={DateAdapter}>
                        {/* <img src="/icons/calender.svg" id="calender"></img>
                        31 Oct 2021
                        <h5 id="timing">Tuesday</h5> */}
                        <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => { setStartDate(newValue); }}
                        format="DD-MM-YYYY"
                        renderInput={(params) => <TextField {...params} />}
                        ></DatePicker>
                    </LocalizationProvider>
                    </div>
                    <img src="/icons/line.png" alt="line" id="border"></img>
                    <div class = "time">
                        <LocalizationProvider dateAdapter={DateAdapter}>
                        {/* <img src="/icons/calender.svg" id="calender"></img>
                        31 Oct 2021
                        <h5 id="timing">Tuesday</h5> */}
                        <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => { setEndDate(newValue); }}
                        renderInput={(params) => <TextField {...params} />}
                        ></DatePicker>
                    </LocalizationProvider>
                    </div>
                </div>
                <div class="date"><p className="text-style">Time</p></div>

                <div class="time-section">
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(newValue) => { setStartTime(newValue); }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <img src="/icons/line.png" alt="line" id="border-2"></img>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newValue) => { setEndTime(newValue); }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </>   
        )
    }
    
    return (
        <div className="modal-container">
            <div className="modal">
                <img id="close" src="/icons/close.svg" alt="close" onClick={handleClose}></img>
                <div className="profile-name">
                    <img alt="profile" src="/profilePictures/user.png"></img>
                    <p className="text-style">Guy Hawkins</p>
                </div>
                <div className="extra-container">
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Enter your message" 
                        value={eventName} 
                        onChange={(e) => {setEventName(e.target.value)}}></input>
                    <div className="propose-event">
                        <p className="text-style">Propose an event?</p>
                        <label class="switch">
                            <input type="checkbox" onClick={() => setProposeEvent(!proposeEvent)}></input>
                            <span class="slider round"></span>
                        </label>
                    </div>
                    {proposeEvent ? proposeEventContent() : null}
                    <b className="error-message">{errorMessage}</b>
                    <button type="button" id="send" onClick={submitEvent}>Send</button>
                </div>
            </div>
        </div>
    );
}