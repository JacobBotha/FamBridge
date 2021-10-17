import React, { useState } from 'react';
import MainCall from '../images/call_main.svg';
import SelfCall from '../images/call_self.png';
import './call.css';

export default function Call(props) {
    const [topicCount, setTopicCount] = useState(1);
    console.log(props.activities)

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
                <img alt="other" src={MainCall}></img>
                <div className="call-menu">
                    <button onClick={endCall}>End Call</button>
                </div>
                <img alt="self" className="self-camera" src={SelfCall}></img>
                <div className="topic-box">
                    <h2>Conversation Starter</h2>
                    <p>{props.topics[topicCount-1]}</p>
                    { props.friends.map((friend) => {
                        let friendActivities = [];
                        props.activities.forEach((activity) => {
                            if (activity.CreatedBy === friend.Id) {
                                friendActivities.push( activity);
                            }
                        });
                        return (
                            <div>
                                <h4>{friend.Name}</h4>
                                <p>Interests: {friend.Interests.join(", ")}</p>
                                <p>{ (friendActivities.length >= 1) ? "Recent Activities: " : ""}{friendActivities.map((activity) => activity.Name)}</p> 
                            </div>
                        )
                    })}
                    <button onClick={nextTopic}>Generate Topic</button>
                </div>
            </div>
    );
}

