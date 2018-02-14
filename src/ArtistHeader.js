import React, { Component } from 'react';

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

export default ArtistHeader;