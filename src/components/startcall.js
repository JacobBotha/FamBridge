import React, { Component } from 'react';
import './startcall.css'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import profile from './profile.png'
import FriendList from './FriendList';
import Grid from '@mui/material/Grid';
import MicIcon from '@mui/icons-material/Mic';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';

export default class StartCall extends Component {
    constructor(props) {
        super(props);
        let friends = props.friends;
        this.state = { friends: friends };
      }

    render () {
        return (
                <div>
                    <Box sx={{ p: 2, height:"5vh" }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Search"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                            fullWidth 
                        />
                        {/* <input type="text" className="search"></input> */}
                    </Box>
                    <div className="family-box">
                        <h2>Family</h2>
                        <FriendList friends={this.state.friends}></FriendList>
                    </div>
                    <Box sx={{ p: 5, height:"30vh"}}>
                        <h2>Friends</h2>
                        <FriendList friends={this.state.friends}></FriendList>
                    </Box>
                    <Box sx={{ p: 2, height:"10vh"}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={5}
                            >
                            <Grid item>
                                <button className="button-call"><VoiceChatIcon></VoiceChatIcon>Call</button>
                                {/* <Button sx={{width:200}} variant="contained">Call</Button> */}
                            </Grid>
                            <Grid item>
                                <button className="button-voice"><MicIcon></MicIcon>Voice Message</button>
                                {/* <Button sx={{width:200}} variant="contained">Voice Message</Button> */}
                            </Grid>
                        </Grid>

                    </Box>
                </div>
        )
    }
}

