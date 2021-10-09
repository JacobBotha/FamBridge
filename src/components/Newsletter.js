import React, { Component } from 'react';

export default class Newsletter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: props.events
        }
        console.log(props.events);
    }

    render () {
        let divStyle = {
            top: "300px", 
            left: "50px"
        };

        return (
            <div style={divStyle}>{
                this.state.events.map(event => {
                    return (<h2>{event.Name +  " at " + event.Time}</h2>);
                })
                }
            </div>
        )
    }
}