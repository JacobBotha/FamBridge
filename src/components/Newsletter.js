import { grey } from '@mui/material/colors';
import React, { Component } from 'react';
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

export default class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.friends = props.friends;
        const items = []
        props.status.map(s => {
            s["isStatus"] = true;
            return (items.push(s));
        });
        props.events.map(e => {
            e["Time"] = e["CreatedOn"];
            e["isStatus"] = false;
            return (items.push(e));
        });
        
        items.sort((a, b) => b.Time > a.Time ? 1: -1)
        this.state = {
            items: items,
            showModal: false
        }
    }

    timeString(dateString) {
        let date = new Date(dateString);
        let time = (date.getHours() % 12) + ":" + ((date.getMinutes() < 10) ? date.getMinutes()+"0" : date.getMinutes()) + " " + ((date.getHours()  >= 12) ? "PM" : "AM");

        return time;
    }

    tableItems() {
        let tableItemsHtml = []
        let greyWhiteBox = [];
        let currentDate = new Date().getDate();

        let isWhite = false;
        for (let event of this.state.items) {
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
                    this.dateItem(date)
                );
                currentDate = date.getDate();
            }
            //This is for the event item
            if (isWhite) {
                greyWhiteBox.push(
                    this.whiteItem(this.getFriend(event.CreatedBy), event)
                );
            } else {
                greyWhiteBox.push(
                    this.grayItem(this.getFriend(event.CreatedBy), event)
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

    getFriend(id) {
        let friend = this.friends.filter((f) => {
            return f.Id === id;
        })

        return friend[0];
    }

    dateItem(date) {
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
            <h2>{dateFormatted}</h2>
        );
    }

    grayItem(friend, event) {
        return (
            <div class="greyLine">
                <img src={friend.Profile} alt="INSERTIMAGE" id="personImg"/>
                <div class="personRelationship">
                    <b>{friend.Name}</b>
                    <b id="relationshipType">{friend.Relationship} </b>
                </div>
                <div class="activity">
                    {event.Name} <a href ="ADD">{this.timeString( event.Time )}</a>
                </div>
                <button>
                    <img src="/icons/joinButtonIcon.png" id="buttonIcon"/>
                    <b>Join</b>
                </button>
            </div>
        );
    }

    whiteItem(friend, event) {
        return (
            <div class="whiteLine">
                <Avatar
                alt={friend.Name}
                src={friend.Profile}
                sx={{ width: 80, height: 80 }}
                // sx={selected.includes(friend) ? {width: 124, height: 124} : { width: 140, height: 140 }}
                // onClick={() => selectFriend(friend)}
                // className={selected.includes(friend) ? "friend-selected" : "friend-unselected"}
                />
                {/* <img src={friend.Profile} alt="INSERTIMAGE" id="personImg"/> */}
                <div class="personRelationship">
                    <b>{friend.Name}</b>
                    <b id="relationshipType">{friend.Relationship} </b>
                </div>
                <div class="activity">
                    {event.Name} <a href ="ADD">{event.Time}</a>
                </div>
                <button>
                    <img src="/icons/joinButtonIcon.png" id="buttonIcon"/>
                    <b>Join</b>
                </button>
            </div>
        );
    }

    render () {
        return (
            <div id="newsletter">
                <div id="container">
                    <header>
                        <h2>Today</h2>
                        <img onClick={() => this.setState({showModal : true})} src="/icons/edit.png" alt="INSERTIMAGE" id="editImg"/>
                    </header>
                    {this.tableItems()}
                    <div className={this.state.showModal ? "" : "hidden"}>
                        <CreateEvent handleCloseModal={() => this.setState({showModal: false})}></CreateEvent>
                    </div>
                </div>
            </div>
        )
    }
}