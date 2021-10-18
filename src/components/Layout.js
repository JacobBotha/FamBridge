import React, { useState } from 'react';

import StartCall from './startcall.js';
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
    const [events, setEvents] = useState(myData.Events);
    const [statuses, setStatuses] = useState(myData.Status);
    const [startCall, setStartCall] = useState(false);
    const [callFriends, setCallFriends] = useState([]);
    const [newsletterSelect, setNewsletterSelect] = useState("All");

  const familyItems = () => {
    let e = []

    for(let event of statuses) {
      for (let friend of myData.Friends) {
        if (friend.Id === event.CreatedBy && friend.Relationship !== "Friend") {
          event["isStatus"] = true;
          e.push(event);
        }
      }
    }

    for (let event of events) {
      for (let friend of myData.Friends) {
        if (friend.Id === event.CreatedBy && friend.Relationship !== "Friend") {
          event["isStatus"] = false;
          e.push(event);
        }
      }
    }
    
    e.sort((a, b) => { return new Date(b.Time) - new Date(a.Time); });

    return e;

  }

  const friendItems = () => {
    let e = [];

    for(let event of statuses) {
      for (let friend of myData.Friends) {
        if (friend.Id === event.CreatedBy && friend.Relationship === "Friend") {
          event["isStatus"] = true;
          e.push(event);
        }
      }
    }

    for (let event of events) {
      for (let friend of myData.Friends) {
        if (friend.Id === event.CreatedBy && friend.Relationship === "Friend") {
          event["isStatus"] = false;
          e.push(event);
        }
      }
    }

    e.sort((a, b) => { return new Date(b.Time) - new Date(a.Time); });

    return e;
  }

  const allItems = () => {
    let e = [];

    for(let event of statuses) {
      event["isStatus"] = true;
      e.push(event);
    }

    for (let event of events) {
      event["isStatus"] = false;
      e.push(event);
    }

    e.sort((a, b) => { return new Date(b.Time) - new Date(a.Time); });

    return e;
  }

  const addItem = (item) => {
    if (item["isStatus"] === true) {
      let newStatus = {Time: item.Time, Name: item.Name, CreatedBy: item.CreatedBy, Photo: item.Photo}
      setStatuses([...statuses, newStatus]);
      return;
    } 

    let newEvent = {Time: item.Time, Name: item.Name, CreatedBy: item.CreatedBy, StartTime: item.StartTime, EndTime: item.EndTime, Going: [item.CreatedBy]}
    console.log(newEvent)
    setEvents([...events, newEvent]);
  }
  
  const handleJoinEvent = (event) => {
    let newEvents = events.filter((e) => {
      return ( e.Time !== event.Time );
    })

    if (event.Going.includes(0)) {
      event.Going.splice(event.Going.indexOf(0), 1);
    } else {
      event.Going = [...event.Going, 0];
    }

    setEvents([...newEvents, event])
  }

  const getNewsletterItems = () => {
    if (newsletterSelect === "All") {
      return allItems();
    }

    if (newsletterSelect === "Friends") {
      return friendItems();
    }

    if (newsletterSelect === "Family") {
      return familyItems();
    }
  }

  const getNewsletterFriends = () => {
    const me = {
      Id: myData.Id,
      Name: myData.Name,
      Profile: myData.Profile,
      Relationship: "Me",
      Interests: []
    }
    return [...myData.Friends, me];
  }

  const leftPanel = function() {
    if (current === 'Newsletter') {
      console.log(friendItems());
      return <Newsletter handleJoinEvent={handleJoinEvent} addItem={addItem} items={getNewsletterItems()} friends={getNewsletterFriends()}></Newsletter>;
    }

    if (current === 'Calendar') {
      return <Calendar events={events}></Calendar>;
    }
  };

  const handleCrumbChange = (crumb) => {
    if(crumb === 'Calendar') {
      setCurrent("Calendar");
    } else {
      setCurrent("Newsletter");
    }

    setNewsletterSelect(crumb);
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
      if (friendId.indexOf(status.CreatedBy) !== -1) {
        activites.push(status);
      }
    }

    return activites;
  }


  const callPage = () => {
    return (
      <Call handleEndCall={handleEndCall} topics={myData.Topics} friends={callFriends} activities={callActivites()}></Call>
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
            <StartCall friends={myData.Friends} handleStartCall={handleStartCall}></StartCall>
          </div>
      </div>
    );
  }

  const pageSwitcher = () => {
    if (startCall === false) {
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

