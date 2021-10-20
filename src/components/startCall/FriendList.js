import React, { useState } from 'react';
import './friendlist.css';

import Avatar from '@mui/material/Avatar';

export default function FriendList(props) {
    const [selected, setSelected] = useState([]);

    const selectFriend = (friend) => {
        let newSelected = [];
        if(selected.includes(friend)) {
            newSelected = selected.filter(function(person) { 
                return person.Id !== friend.Id;
            });
        } else if(selected.length < 1) {
            newSelected = [friend];
        } else {
            newSelected = [...selected, friend];
        }

        setSelected(newSelected);
        props.handleSelected(newSelected);
    }

    const friendListGrid = () => {
        var gridHtml = [];
        var rowHtml = [];

        for (let i = 1; i <= props.friends.length; i++) {
            let friend = props.friends[i-1];


            rowHtml.push(<div key={friend.Id} className="grid-item"><Avatar
                    alt={friend.Name}
                    src={friend.Profile}
                    // sx={{ width: 140, height: 140 }}
                    sx={selected.includes(friend) ? {width: 124, height: 124} : { width: 140, height: 140 }}
                    onClick={() => selectFriend(friend)}
                    className={selected.includes(friend) ? "friend-selected" : "friend-unselected"}
                    />
                    <h3>{friend.Name}</h3>
                    </div>);

            if (i % 3 === 0) {
                gridHtml.push(
                    <div key={i} className="grid-row">
                        {rowHtml}
                    </div>);
                rowHtml = [];
            }
        }

        if(rowHtml !== []) {
            console.log("ROW LENGTH: ", rowHtml.length)
            for (let i = 0; i <= 3 - rowHtml.length; i++) {
                rowHtml.push(
                    <div style={{width: 140, height: 140}} className="grid-item"></div>
                )   
            }

            console.log("ROW LENGTH: ", rowHtml.length)
            gridHtml.push(
            <div key={props.friends.length +1} className="grid-row">
                {rowHtml}
            </div>);

        }
       
        return gridHtml;
    }

    return (
        <div className="friend-list">
            {/* {friends.map(friend => {
                return (<div>
                    <Avatar
                    alt={friend.Name}
                    src={friend.Profile}
                    // sx={{ width: 140, height: 140 }}
                    sx={selected.includes(friend) ? {width: 124, height: 124} : { width: 140, height: 140 }}
                    onClick={() => selectFriend(friend)}
                    className={selected.includes(friend) ? "friend-selected" : "friend-unselected"}
                    />
                    <h3>{friend.Name}</h3>
                </div>)
            })} */}
            {friendListGrid()}
        </div>
    )
}

