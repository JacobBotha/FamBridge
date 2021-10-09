import React, { Component } from 'react';

import StartCall from './startcall.js';
import Grid from '@mui/material/Grid';
import Newsletter from './Newsletter';
import Calendar from './Calendar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import myData from '../data.json';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { current: 'newsletter',
          name: myData.Name,
          profile: myData.Profile,
          friends: myData.Friends,
          events: myData.Events
      };
    }

    leftPanel() {
      if (this.state.current === 'newsletter') {
        return <Newsletter events={this.state.events}></Newsletter>;
      }

      if (this.state.current === 'calendar') {
        return <Calendar  events={this.state.events}></Calendar>;
      }
    }

    setNewsletter() {
      this.setState({
        curent : 'newsletter'
      });
    }

    setCalendar() {
      this.setState({
        curent : 'calendar'
      });
    }

    render () {
        return (
            <div style={{ width: '100%' }}>
              <Grid container spacing={0} direction="row">
                <Grid item xs={8}  sx={{ bgcolor: 'primary.light' }}>
                  <AppBar position="static">
                      <Toolbar style={{ 
                          float       : 'none', 
                          width       : '200px',
                          marginLeft  : 'auto',
                          marginRight : 'auto'
                      }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1}} position="centred">
                          Newsletter
                      </Typography>
                      </Toolbar>
                  </AppBar>
                  {this.leftPanel()}
                </Grid>
                <Grid item xs={4}>
                  <StartCall friends={this.state.friends}></StartCall>
                </Grid>
              </Grid>
            </div>
          );
    }
}

