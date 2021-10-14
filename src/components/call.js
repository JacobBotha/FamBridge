import React, { useState } from 'react';
import MainCall from '../images/call_main.svg';
import SelfCall from '../images/call_self.png';
import './call.css';

export default function Call(props) {
    const [topicCount, setTopicCount] = useState(1);

    const endCall = () => {
        return props.handleEndCall();
    }

    const nextTopic = () => {
        if (topicCount >= props.topics.length) {
            setTopicCount(1);
        } else {
            setTopicCount(topicCount + 1);
        }
    }

    return (
            <div>
                <img src={MainCall}></img>
                <div className="call-menu">
                    <button onClick={endCall}>End Call</button>
                </div>
                <img className="self-camera" src={SelfCall}></img>
                <div className="topic-box">
                    <h2>Conversation Starter</h2>
                    <p>{props.topics[topicCount-1]}</p>
                    { props.friends.map((friend) => {
                        return (
                            <div>
                                <h4>{friend.Name}</h4>
                                <p>Interests: {friend.Interests.join(", ")}</p>
                                <p>{ props.activities.length >= 1 ? "Recent Activities: " : ""}{props.activities.map((activity) => activity.Name)}</p> 
                            </div>
                        )
                    })}
                    <button onClick={nextTopic}>Generate Topic</button>
                </div>
            </div>
    );
}

