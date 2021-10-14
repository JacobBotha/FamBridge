import React, { Component, useState } from 'react';
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
import { height } from '@mui/system';

export default function StartCall(props) {
    const [friends, setFriends] = useState(props.friends);
    const [selected, setSelected] = useState([]);

    const handleStartCall = () => {
        props.handleStartCall(selected);
    }

    const handleSelectFriend = (friend) => {
        if(selected.length < 1) {
            setSelected([friend]);
        } else {
            setSelected(oldSelected => [...oldSelected, friend]);
        }
    }

    return (
            <div style={{height: "100vh"}}>
                <div style={{ padding: "10px", top:"10px" }}>
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
                </div>
                <div className="family-box">
                    <h2>Family</h2>
                    <FriendList handleSelectFriend={handleSelectFriend} friends={friends}></FriendList>
                </div>
                
                <div className="buttons-container">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={5}
                        className="buttons-container"
                        >
                        <Grid item>
                            <button className="button-call" onClick={handleStartCall}><VoiceChatIcon></VoiceChatIcon>Call</button>
                            {/* <Button sx={{width:200}} variant="contained">Call</Button> */}
                        </Grid>
                        <Grid item>
                            <button className="button-voice"><MicIcon></MicIcon>Voice Message</button>
                            {/* <Button sx={{width:200}} variant="contained">Voice Message</Button> */}
                        </Grid>
                    </Grid>

                </div>
            </div>
    )
}

