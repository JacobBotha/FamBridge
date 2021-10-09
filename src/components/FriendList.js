import React, { Component } from 'react';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = { friends: props.friends};
      }

    render () {
        return (
            <Grid container spacing={6}>
                {this.state.friends.map(friend => {
                    return (<Grid item>
                        <Avatar
                        alt={friend.Name}
                        src={null}
                        sx={{ width: 70, height: 70 }}
                        />
                    </Grid>)
                })}
            </Grid>
        )
    }
}

