import React, { useState } from 'react';
import './friendlist.css';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

export default function FriendList(props) {
    const [friends, setFriends] = useState(props.friends);
    const [selected, setSelected] = useState([]);

    const selectFriend = (friend) => {
        console.log(selected);
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

    const friendStyle = (friend) => {
        if(selected === undefined || selected === null) {
            return "friend-unselected";
        }

        if (selected.includes(friend)) {
            return "friend-selected";
        }

        return "friend-unselected";
    }

    const friendListGrid = () => {
        var gridHtml = [];
        var rowHtml = [];

        for (let i = 1; i < friends.length; i++) {
            let friend = friends[i-1];
            console.log(i)


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

            if (i % 3 == 0) {
                console.log("New Row")
                gridHtml.push(
                    <div key={i} className="grid-row">
                        {rowHtml}
                    </div>);
                rowHtml = [];
            }
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

