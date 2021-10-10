import React, { useState } from 'react';

import StartCall from './startcall.js';
import Grid from '@mui/material/Grid';
import NewsletterBar from './NewsletterBar.js';
import Newsletter from './Newsletter';
import Calendar from './Calendar';
import Breadcrumb from './Breadcrumb.js';

import myData from '../data.json';

const leftSideStyle = {
  "background": "#C4C4C4",
  "border": "1px solid #C4C4C4",
  "box-sizing": "border-box",
  "height": "100vh",
}

export default function Layout(props) {
    const [current, setCurrent] = useState("Newsletter");
    const [name, setName] = useState(myData.Name);
    const [profile, setProfile] = useState(myData.Profile);
    const [friends, setFriends] = useState(myData.Friends);
    const [events, setEvents] = useState(myData.Events);
    const [status, setStatus] = useState(myData.Status);

    const leftPanel = function() {
      if (current === 'Newsletter') {
        return <Newsletter events={events} status={status}></Newsletter>;
      }

      if (current === 'Calendar') {
        return <Calendar  events={events}></Calendar>;
      }
    }

    const handleCrumbChange = (crumb) => {
      if(crumb === 'Calendar') {
        setCurrent("Calendar");
      } else {
        setCurrent("Newsletter");
      }
    }

    return (
        <div style={{ width: '100%' }}>
          <Grid container spacing={0} direction="row">
            <Grid item xs={8} style={leftSideStyle}>
              <NewsletterBar></NewsletterBar>
              <Breadcrumb handleCrumbChange={handleCrumbChange}/>
              {leftPanel()}
            </Grid>
            <Grid item xs={4}>
              <StartCall friends={friends}></StartCall>
            </Grid>
          </Grid>
        </div>
      );
}

