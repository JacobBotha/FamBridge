import React, { Component } from 'react';
import './newsletter.css';

export default class Newsletter extends Component {
    constructor(props) {
        super(props);
        const items = []
        props.status.map(s => {
            s["isStatus"] = true;
            return (items.push(s));
        });
        props.events.map(e => {
            e["isStatus"] = false;
            return (items.push(e));
        });
        
        items.sort((a, b) => b.Time > a.Time ? 1: -1)
        this.state = {
            items: items
        }
    }

    timeString(dateString) {
        let date = new Date(dateString);
        let time = (date.getHours() % 12) + ":" + ((date.getMinutes() < 10) ? date.getMinutes()+"0" : date.getMinutes()) + " " + ((date.getHours()  >= 12) ? "PM" : "AM");

        return time;
    }

    tableItems() {
        let tableItemsHtml = []
        let currentDate = null
        for (let event of this.state.items) {
            let date = new Date(event.Time);
            if (date.getDate() != currentDate) {
                //This is for the date
                tableItemsHtml.push(
                    this.dateItem(date.getUTCDate() + "/" + date.getMonth())
                );
                currentDate = date.getDate();
            }
            //This is for the event item
            tableItemsHtml.push(
                this.whiteItem(event.Name, event.Time)
            );
        }

        return tableItemsHtml;
    }

    dateItem(date) {
        return (
            <div className="">{date}</div>
        );
    }

    grayItem(name, time) {
        return (
            <div className="newsletter-item newsletter-gray"><h2>{name +  " at " + this.timeString(time)}</h2></div>
        );
    }

    whiteItem(name, time) {
        return (
            <div className="newsletter-item newsletter-white"><h2>{name +  " at " + this.timeString(time)}</h2></div>
        );
    }

    render () {
        return (
            <div>{
                this.tableItems().map(item => {return item})
                }
            </div>
        )
    }
}