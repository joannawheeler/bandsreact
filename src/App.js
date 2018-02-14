import React, { Component } from 'react';
import './App.css';
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

    const datetime = event.datetime;

    const venueName = event.venue.name;

    const location = event.venue.country === "United States" ? event.venue.city + ", " + event.venue.region : event.venue.city + ", " + event.venue.country;

    let ticketURL = "#";

    let ticketDisplay = "displayTicket";

    if (event.offers.length >= 1) {
      ticketURL = event.offers[0].url;
    } else {
      ticketDisplay = "doNotDisplayTicket";
    }
    console.log(event);

    return (
      <tr>
        <td id="monthDate"><span><Moment format="MMM DD">{datetime}</Moment></span></td>
        <td id="venueName"><span>{venueName}</span></td>
        <td id="venueLocation"><span>{location}</span></td>
        <td id="ticketsButtonCell"><span id={ticketDisplay}><a href={ticketURL} id="ticketsButton">Tickets</a></span></td>
      </tr>
    );
  }
}

class NoUpcomingEvents extends Component {
 render() {
  return (
    <div id="text-noUpcomingEvents">No upcoming events.</div>
  )
 }
}

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
      }));

    fetch(requestURL + '/events' + this.state.auth)
      .then(res => res.json())
      .then(data =>
      this.setState({
        events: data,
        loaded: true
      }));
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
