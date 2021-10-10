import React, { Component } from 'react';

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
                tableItemsHtml.push(<h2>{date.getUTCDate() + "/" + date.getMonth()}</h2>)
                currentDate = date.getDate();
            }
            tableItemsHtml.push(<h2>{event.Name +  " at " + this.timeString(event.Time)}</h2>)
        }

        return tableItemsHtml;
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