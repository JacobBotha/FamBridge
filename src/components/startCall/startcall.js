import React, { useState } from 'react';
import './startcall.css'

import FriendList from './FriendList';
import MicIcon from '@mui/icons-material/Mic';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import VoiceMessage from './VoiceMessage';

export default function StartCall(props) {
    const [selected, setSelected] = useState([]);
    const [friends, setFriends] = useState(props.friends);
    const [searchContent, setSearchContent] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleStartCall = () => {
        if(selected.length < 1) {
            return;
        }
        props.handleStartCall(selected);
    }

    const handleSelected = (selected) => {
        setSelected(selected);
    }

    const handleFriendSearch = (name) => {
        setSearchContent(name);
        if (name === "") {
            setFriends(props.friends);
            return;
        }
        
        console.log(name);
        let newFriends = props.friends.filter((friend) => {
            console.log("Friend.Name (", friend.Name, ") includes", name, " = ", friend.Name.includes(name));
            return friend.Name.toLowerCase().includes(name.toLowerCase());
        })

        setFriends(newFriends);
    }

    const handleOpenVoiceMessage = () => {
        if (selected.length < 1) {
            return;
        }

        setShowModal(true);
    }

    return (
            <div style={{width: "100%", height:"100%"}}>
                <div className="search-container">
                    <input type="text" className="search" value={searchContent} onChange={(e) => {handleFriendSearch(e.target.value)}} placeholder="Search Contact"></input>
                </div>
                <div className="family-box">
                    <FriendList handleSelected={handleSelected} friends={friends}></FriendList>
                </div>
                
                <div className="buttons-container">
                    <button className={selected.length >= 1 ? "button-call-active": "button-call"} onClick={handleStartCall}>
                        <VoiceChatIcon className="button-icon" ></VoiceChatIcon>Call</button>
                            {/* <Button sx={{width:200}} variant="contained">Call</Button> */}
                    <button className={selected.length >= 1 ? "button-call-active": "button-call"} onClick={handleOpenVoiceMessage}><MicIcon className="button-icon">
                        </MicIcon>Voice Message
                    </button>
                            {/* <Button sx={{width:200}} variant="contained">Voice Message</Button> */}
                </div>
                <div className={showModal? "voice-container" : "hidden"}>
                    <div className="voiceMessage">                    
                        <VoiceMessage closeModal={() => setShowModal(false)}></VoiceMessage>
                    </div>
                </div>
            </div>
    )
}

