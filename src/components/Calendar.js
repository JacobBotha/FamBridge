import React, { useState } from 'react';
import './calendar.css'

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days = ['Su', 'M', 'T', 'W', 'T', 'F', 'Sa'];

export default function Calendar(props) {
    const [month, setMonth] = useState(9);
    const [year, setYear] = useState(2021);

    const weekRow = (startDate, maxDate) => {
        let dayCards = []

        let date = startDate;
        let i = 1;
        while (date < startDate + 7) {
            let dateClass = "weekday";
            if (i === 1 || i === 7) {
                dateClass = "weekEnd";
            }
            if (date < 1 || date > maxDate) {
               dayCards.push(dayCard("", dateClass, date));              
            } else {
                dayCards.push(dayCard(date, dateClass, date));
            }

            date++;
            i++;
        }
        return (
            <div key={startDate} class="week">
                {dayCards}
            </div>
        )
    }

    const weeksList = () => {
        let weeksHtml = [];
        const maxDate = new Date(year, month+1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay() - 1;

        console.log("StartDay: ",new Date(year, month, 1).getDay())
        for (let i = 0; i < 6; i++) {
            if(i*7 - startDay > maxDate) {
                break;
            } else if(i*7 - startDay === -7) {
                continue;
            }
            weeksHtml.push(weekRow(i*7 - startDay, maxDate));
        }

        return weeksHtml;
    }
        
    const badge = () => {
        return (<span className="event-badge"></span>)
    }

    const dayCard = (date, dayClass, id) => { 
        let eventToday = props.events.filter((event) => {
            let startDate = new Date(event.StartTime);
            let endDate = new Date(event.EndTime);
            return (
                startDate.getDate() <= date  &&
                endDate.getDate() >= date &&
                startDate.getMonth() <= month  &&
                endDate.getMonth() >= month &&
                startDate.getFullYear() <= year &&
                endDate.getFullYear() >= year 
            )
        });

        let includeBadge = false;
        
        if (eventToday.length > 0) {
            includeBadge = true;
            console.log("Include Badge for ", date, " ", true);
        }
        return (
            <div className={includeBadge ? "pointer-date date" : "date"} key={id}>
                {includeBadge ? badge() : null}
                <b id={dayClass}>{date}</b>
            </div>
        )
    }

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    return (
            <div id="calContainer"> 
                <div id="month">
                    <b>{months[month] + " " + year}</b>
                    <img src="/icons/arrow-left-bold.png" onClick={prevMonth} alt="INSERTIMAGE" id="leftArrow"/>
                    <img src="/icons/arrow-right-bold.png" onClick={nextMonth} alt="INSERTIMAGE" id="rightArrow"/>
                </div>
                <div class="days">
                    { days.map( (day, index) => {
                        let dayClass = "weekday";
                        if (index === 0 || index === 6) {
                            dayClass = "weekEnd";
                        }
                        return (
                            <div class="dayName">
                                <b id={dayClass}>{day}</b>
                            </div>
                    )})}
                </div>
                {weeksList()}
        </div>
    )
}

