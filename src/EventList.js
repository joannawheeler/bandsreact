import React, { Component } from 'react';
import Moment from 'react-moment';

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


export default EventList;