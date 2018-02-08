import React, { Component } from 'react';
import './App.css';
import Moment from 'react-moment';


class ArtistHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    fetch("https://rest.bandsintown.com/artists/Maroon%205?app_id=bit_challenge")
      .then(res => res.json())
      .then(data =>
      this.setState({
        artist: data
      }));
  }

  // test

  render() {
    const { artist } = this.state;
    return (
      <div id="artistHeader">
        <div id="artistImage">
          <img id="thumbImage" src={artist.thumb_url} />
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

    {events.map(event =>
      rows.push(
        <EventRow event={event} key={event.id} />
    ))};

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

    const datetime = event.datetime

    return (
      <tr>
        <td><Moment format="MMM DD">{datetime}</Moment></td>
        <td>{event.venue.name}</td>
        <td>{location}</td>
        <td>tickets button</td>
      </tr>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch("https://rest.bandsintown.com/artists/Maroon%205/events?app_id=bit_challenge")
      .then(res => res.json())
      .then(data =>
      this.setState({
        events: data
      }));
  }

  render() {
    const { events } = this.state;

    return (
      <div id="container">
        <ArtistHeader />
        <EventList events={this.state.events} />
      </div>
    );
  }
}


export default App;
