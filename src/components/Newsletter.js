import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import CreateEvent from './CreateEvent';
import './newsletter.css';
import Avatar from '@mui/material/Avatar';


const today = new Date().toJSON();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const getLastWeek = () => {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek;
}

const isToday = (someDate, offset = 0) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() - offset &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

const timeString = (dateString) => {
    let date = new Date(dateString);
    let time = (date.getHours() % 12) + ":" + ((date.getMinutes() < 10) ? date.getMinutes()+"0" : date.getMinutes()) + " " + ((date.getHours()  >= 12) ? "PM" : "AM");

    return time;
}

export default function Newsletter(props) {
    const [showModal, setShowModal] = useState(false);


    const tableItems = () => {
        let tableItemsHtml = []
        let greyWhiteBox = [];
        let currentDate = new Date(props.items[0].Time).getDate();

        let isWhite = false;
        for (let event of props.items) {
            let date = new Date(event.Time);
            if (date.getDate() != currentDate) {
                //This is for the date
                tableItemsHtml.push(
                    <div class="greyWhiteBoxes">
                        {greyWhiteBox}
                    </div>
                );
                greyWhiteBox = []
                isWhite = false;

                tableItemsHtml.push(
                    dateItem(date)
                );
                currentDate = date.getDate();
            }
            //This is for the event item
            if (isWhite) {
                greyWhiteBox.push(
                    newsletterRow(getFriend(event.CreatedBy), event, "whiteLine")
                );
            } else {
                greyWhiteBox.push(
                    newsletterRow(getFriend(event.CreatedBy), event, "greyLine")
                );
            }

            isWhite = !isWhite;
        }

        tableItemsHtml.push(
            <div class="greyWhiteBoxes">
                {greyWhiteBox}
            </div>
        );

        return tableItemsHtml;
    }

    const getFriend = (id) => {
        let friend = props.friends.filter((f) => {
            return f.Id === id;
        })

        return friend[0];
    }

    const dateItem = (date) => {
        let dateFormatted = "";
        if (isToday(date)) {
            dateFormatted = "Today";
        } else if (isToday(date, 1)) {
            dateFormatted = "Yesterday"
        } else if (date.getTime() > getLastWeek().getTime()) {
            dateFormatted = days[date.getDay()];
        } else {
            dateFormatted = date.getDate() + "-" + months[date.getMonth()];
        }
        return (
            <h2 className="heading">{dateFormatted}</h2>
        );
    }

    const newsletterRow = (friend, event, rowClass) => {
        return (
            <div class={rowClass}>
                <Avatar
                alt={friend.Name}
                src={friend.Profile}
                id="personImg"
                />
                {/* <img src={friend.Profile} alt="INSERTIMAGE" id="personImg"/> */}
                <div class="personRelationship">
                    <b>{friend.Name}</b>
                    <b id="relationshipType">{friend.Relationship} </b>
                </div>
                <div class="activity">
                    {event.Name} <a href="">{timeString(event.Time)}</a>
                </div>
                <button className="button-join">
                    <img src="/icons/joinButtonIcon.png" id="buttonIcon"/>
                    <b>Join</b>
                </button>
            </div>
        );
    }

    const updateItems = (item) => {
        return;
    }

    return (
        <div id="newsletter">
            <div id="container">
                <header className="newsletter-header">
                    {dateItem(new Date(props.items[0].Time))}
                    <img onClick={() => setShowModal(true)} src="/icons/edit.png" alt="INSERTIMAGE" id="editImg"/>
                </header>
                {tableItems()}
                <div className={showModal ? "" : "hidden"}>
                    <CreateEvent updateItems={updateItems} handleCloseModal={() => setShowModal(false)}></CreateEvent>
                </div>
            </div>
        </div>
    )
}