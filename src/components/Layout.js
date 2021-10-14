import React, { useState } from 'react';

import StartCall from './startcall.js';
import Grid from '@mui/material/Grid';
import NewsletterBar from './NewsletterBar.js';
import Newsletter from './Newsletter';
import Calendar from './Calendar';
import Breadcrumb from './Breadcrumb.js';
import Call from './call.js';

import myData from '../data.json';

const leftSideStyle = {
  "background": "#C4C4C4",
  "border": "1px solid #C4C4C4",
  "box-sizing": "border-box",
  "height": "100vh",
  "width" : "60vw"
}

export default function Layout(props) {
    const [current, setCurrent] = useState("Newsletter");
    const [name, setName] = useState(myData.Name);
    const [profile, setProfile] = useState(myData.Profile);
    const [friends, setFriends] = useState(myData.Friends);
    const [events, setEvents] = useState(myData.Events);
    const [statuses, setStatuses] = useState(myData.Status);
    const [topics, setTopics] = useState(myData.Topics);
    const [startCall, setStartCall] = useState(false);
    const [callFriends, setCallFriends] = useState([]);

    const leftPanel = function() {
      if (current === 'Newsletter') {
        return <Newsletter events={events} status={statuses}></Newsletter>;
      }

      if (current === 'Calendar') {
        return <Calendar  events={events}></Calendar>;
      }
    };

    const handleCrumbChange = (crumb) => {
      if(crumb === 'Calendar') {
        setCurrent("Calendar");
      } else {
        setCurrent("Newsletter");
      }
    };

    const handleStartCall = (friends) => {
      setCallFriends(friends);
      setStartCall(true);
    };

    const handleEndCall = () => {
      setCallFriends([]);
      setStartCall(false);
    };

    const callActivites = () => {
      const activites = [];
      var friendId = [].concat(callFriends).map(({Id})=>Id);
      for(let status of statuses) {
        if (friendId.indexOf(status.CreatedBy) != -1) {
          activites.push(status);
        }
      }

      return activites;
    }


    const callPage = () => {
      return (
        <Call handleEndCall={handleEndCall} topics={topics} friends={callFriends} activities={callActivites()}></Call>
      )
    }

    const mainPage = () => {
      return (
        <div style={{ width: '100%', height: "100%" }}>
            <div style={leftSideStyle}>
              <NewsletterBar></NewsletterBar>
              <Breadcrumb handleCrumbChange={handleCrumbChange}/>
              {leftPanel()}
            </div>
            <div style={{position: "absolute", width: "40%", height:"100%", right: "0px", top:"0px"}}>
              <StartCall friends={friends} handleStartCall={handleStartCall}></StartCall>
            </div>
        </div>
      );
    }

    const pageSwitcher = () => {
      if (startCall == false) {
        return mainPage();
      }

      return callPage();
    }

    return (
      <div>
        {pageSwitcher()}
      </div>
    )
}

