import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

export default function FriendList(props) {
    const [friends, setFriends] = useState(props.friends);

    const selectFriend = (friend) => {
        props.handleSelectFriend(friend);
    }

    return (
        <Grid container spacing={6}>
            {friends.map(friend => {
                return (<Grid item>
                    <Avatar
                    alt={friend.Name}
                    src={friend.Profile}
                    sx={{ width: 70, height: 70 }}
                    onClick={() => selectFriend(friend)}
                    />
                    {friend.Name}
                </Grid>)
            })}
        </Grid>
    )
}

