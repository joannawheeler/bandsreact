import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';
import qs  from 'qs';
import EventList from './EventList.js';
import ArtistHeader from './ArtistHeader.js';
import NoUpcomingEvents from './NoUpcomingEvents.js';


class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      events: [],
      artist: [],
      artistName: "",
      auth: "?app_id=bit_challenge",
      loaded: false
    }
  }

  componentDidMount() {
    const params = window.location.search;
    const parsedParam = qs.parse(params, { ignoreQueryPrefix: true });
    const artistName = encodeURIComponent(parsedParam.artist.slice(1));
    this.setState({
      artistName: artistName
    })
    const requestURL = 'https://rest.bandsintown.com/artists/' + artistName;

    fetch(requestURL + this.state.auth)
      .then(res => res.json())
      .then(data =>
      this.setState({
        artist: data,
      }))
      .catch(error => console.log('error:', error));

    fetch(requestURL + '/events' + this.state.auth)
      .then(res => res.json())
      .then(data =>
      this.setState({
        events: data,
        loaded: true
      }))
      .catch(error => console.log('error:', error));
  }

  render() {
    const { events } = this.state;
    const { artist } = this.state;
    let display;

    if (events.length >= 1) {
      display =
      <EventList events={ events } />
    } else if (events.length < 1 && this.state.loaded === true) {
      display = <NoUpcomingEvents />
    }

    return (
      <div id="container">
        <ArtistHeader artist={ artist } />
        { display }
      </div>
    )
  }
}

export default App;
