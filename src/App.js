import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Moment from 'react-moment';
import qs  from 'qs';

class ArtistHeader extends Component {

  render() {
    const artist = this.props.artist;

    return (
      <div id="artistHeader">
        <div id="artistImage">
          <img id="thumbImage" src={artist.thumb_url} alt="" />
        </div>
        <div id="textRightOfImage">
          <strong id="artistName">{artist.name}</strong>
          <p id="text-upcomingEvents">Upcoming Events</p>
        </div>
      </div>
    );
  }
}

class EventList extends Component {
  render() {
    const rows = [];
    const events = this.props.events;

    events.map(event =>
      rows.push(
        <EventRow event={event} key={event.id} />
    ));

    return (
      <div>
        <table id="eventsTable">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class EventRow extends Component {
  render() {
    const event = this.props.event;
    const location = event.venue.country === "United States" ? event.venue.city + ", " + event.venue.region : event.venue.city + ", " + event.venue.country;
    const datetime = event.datetime;

    return (
      <tr>
        <td id="monthDate"><Moment format="MMM DD">{datetime}</Moment></td>
        <td id="venueName">{event.venue.name}</td>
        <td id="venueLocation">{location}</td>
        <td id="ticketsButtonCell"><a href="" id="ticketsButton">tickets button</a></td>
      </tr>
    );
  }
}

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      artist: [],
      artistName: "",
      auth: "?app_id=bit_challenge"
    }
  }

  componentDidMount() {
    const params = window.location.search;
    const parsedParam = qs.parse(params, { ignoreQueryPrefix: true });
    const artistName = encodeURIComponent(parsedParam.artist.slice(1));
    this.setState({
      artistName: artistName
    })
    // const auth = "?app_id=bit_challenge";
    //const requestURL = "https://rest.bandsintown.com/artists/" + artistName;
    const requestURL = 'https://rest.bandsintown.com/artists/' + artistName;

    fetch('https://rest.bandsintown.com/artists/' + artistName + this.state.auth)
      .then(res => res.json())
      .then(data =>
      this.setState({
        artist: data,
      }));
    fetch(requestURL + '/events' + this.state.auth)
      .then(res => res.json())
      .then(data =>
      this.setState({
        events: data,
      }));
  }
        // <Router>
        // <div>
          // <Route path={path}

  render() {
    const { events } = this.state;
    const { artist } = this.state;
    return (
      <div>
        <ArtistHeader artist={ artist } />
        <EventList events={ events } />
      </div>
    )
  }
}

class App extends Component {

  render() {
    return (
      <div id="container">
        <Router>
        <div>
            <Route path='/' component={ Container } />
          </div>
        </Router>
      </div>
    );
  }
}
//localhost:3000/?artist=:url_escaped_artist_name



export default App;
