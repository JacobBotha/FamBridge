import React, { useRef, useState } from 'react';
import MainCall from '../../images/call_main.svg';
// import SelfCall from '../../images/call_self.png';
import './call.css';
// import * as fb from '../../firebase/firebaseWebRTC';
// import Camera from './Camera';
import { useUserMedia } from './useUserMedia';

const CAPTURE_OPTIONS = {
    audio: true,
    video: { facingMode: "environment" },
};

export default function Call(props) {
    const [topicCount, setTopicCount] = useState(1);
    const localRef = useRef();
    console.log(props.activities)
    // const [localStream, setLocalStream] = useState(null);
    const localStream = useUserMedia(CAPTURE_OPTIONS);
    // const [remoteStream, setRemoteStream] = useState(null);

    if (localStream && localRef.current && !localRef.current.srcObject) {
        localRef.current.srcObject = localStream;
    }

    // useEffect(() => {
    //     async function startCall() {
    //         try {
    //             const stream = await navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS);
    //             setLocalStream(stream);
    //         } catch(err) {
    //                 // Removed for brevity
    //         }
        
    //         // const [local, remote] = await fb.openUserMedia(null);
    //         // setLocalStream(local);
    //         // setRemoteStream(remote);
    //     }
    //     if (!localStream) {
    //         startCall();
    //     } else {
    //         return function cleanup() {
    //             localStream.getTracks().forEach(track => {
    //                 track.stop();
    //             });
    //         }
    //     }
    // }, [localStream]);

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

    function handleCanPlay() {
        // setAspectRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        
        localRef.current.play();
    }

    return (
            <div>
                <div style={{position:"fixed", width: "100vw", height:"100vh", overflow:"hidden", zIndex: "-1"}}>
                    <img alt="other" src={MainCall} style={{width:"100vw"}}></img>
                </div>
                {/* <div className="call-menu">
                    <button onClick={endCall}>End Call</button>
                </div> */}
                <div id="callMenuBar">
                    <div className="callIconButtons">
                        <img src="/icons/microphone.png" class="menuIcon" alt="microphone"/>
                        <img src="/icons/video.png" class="menuIcon" alt="microphone"/>
                    </div>
                    <button onClick={endCall} id="endCall">
                        End Call 
                    </button>
                </div>
                {/* <Camera></Camera> */}
                <div id="localVideo">
                    <video ref={localRef} onCanPlay={handleCanPlay} muted></video>
                </div>
                {/* <img alt="self" className="self-camera" src={SelfCall}></img> */}
                <div className="topicPopUp">
                    <h2>Conversation Starter</h2>
                    <p>{props.topics[topicCount-1]}</p>
                    <div className="interests">
                    { props.friends.map((friend) => {
                        let friendActivities = [];
                        props.activities.forEach((activity) => {
                            if (activity.CreatedBy === friend.Id) {
                                friendActivities.push(activity.Name);
                            }
                        });
                        // friendActivities = friendActivities.join(", ");

                        return (
                            <div>
                                <h4 style={{textDecoration: "underline"}}>{friend.Name}</h4>
                                <p>Interests: {friend.Interests.join(", ")}</p>
                                <p>{ (friendActivities.length >= 1) ? "Recent Activities: " : ""}</p>{friendActivities.map((activity) => <p>{activity}</p>)}
                            </div>
                        )
                    })}
                    </div>
                    <button className="generateTopic" onClick={nextTopic}>Generate Topic</button>
                </div>
            </div>
    );
}

