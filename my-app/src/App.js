import React, { Component } from "react";
import "./App.css";
import Searchbox from "./Searchbox";
import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);

    //define the functions

    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showEvents = this.showEvents.bind(this);

    //set initial states

    this.state = {
      search: "",
      activeResults: false,
      isLoading: "",
      allData: [],
      artistName: [],
      artistFb: [],
      artistPhoto: [],
      eventsData: [],
      upcomingEvents: [],
      eventSearch: false,
      length: [],
      enterPressed: false,

    };
  }

  //Search function for the searchbox

  onSearch(query) {
    this.setState({
      search: query,
      enterPressed: false,
    });

  }

  //Submit the query input in the searchbox

  onSubmit() {
    this.setState({
      eventsData: [],
      eventSearch: false,
      isLoading: "https://www.dariusland.com/images/load.gif",
      enterPressed: false,
      activeResults: false,
    });


    //Get the searched artist's data from the API

    fetch(

      "https://rest.bandsintown.com/artists/" + this.state.search + "/?app_id=bands_in_town"

    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);  //check API response in the console
        this.setState({
          allData: response,
          artistName: response.name,
          artistFb: response.facebook_page_url,
          artistPhoto: response.image_url,
          isLoading: "",
          upcomingEvents: response.upcoming_event_count,
          activeResults: true,
          length: [response].length
        });
        console.log(               //check if the states were set properly
          this.state.artistName,
          this.state.artistFb,
          this.state.artistPhoto,
          this.state.length,
        );

        //if the search does not match any artist in the API's database, set the following states:

        if (this.state.artistName === undefined) {
          this.setState({
            length: " 0 ",
            activeResults: false,
            enterPressed: true,
          })

          //otherwise, do this:

        } else {
          this.setState({
            length: [response].length,
            activeResults: true,
            enterPressed: true,
          })
        }

      });



  }

  //function for the show events button

  showEvents() {
    fetch(
      "https://rest.bandsintown.com/artists/" +
      this.state.artistName +
      "/events?app_id=bands_in_town"

    )
      .then((results) => results.json())
      .then((results) => {
        this.setState({
          eventsData: [results],
          eventSearch: true,

        });
      });
    console.log(
      this.state.eventsData[0],
    );

  }



  render() {

    return (
      <div className="App">
        <div className="loader"><img className="spinner" src={this.state.isLoading} /></div>
        <div className="header">
          <Searchbox
            label="search"
            onChange={this.onSearch}
            onKeyDown={this.onSubmit}
          />
        </div>
        <br></br>
        {  //shows the number of result(s) received from the search
          this.state.enterPressed ?
            <div> <strong>{this.state.length}</strong> result(s) found for <strong>"{this.state.search}"</strong> </div>
            :
            <div></div>
        }

        {   //shows the artist's data
          //if the activeResults state is set to 'true', show the following data:

          this.state.activeResults ?
            <div className="artistTop">
              <div className="artist-container">
                <div className="result-box">
                  <div className="column-left">
                    <img className="photo" src={this.state.artistPhoto} />
                  </div>
                  <div className="column-right">
                    <p className="name">{this.state.artistName}</p>
                    <p className="facebook">{this.state.artistFb}</p>
                    <button className="button" onClick={this.showEvents}> See Upcoming Events</button>
                  </div>
                </div>
              </div></div> :
            <div></div>
        }


        {   //shows the artist's upcoming events' data
          //if the eventSearch state (initialized on 'show events' button click) is set to 'true', show the following data:

          this.state.eventSearch ?
            <div className="totalEvents"><strong>{this.state.upcomingEvents}</strong> upcoming events</div> :
            <div></div>
        } <div className="events-container">
          {this.state.eventsData.length > 0 ?
            this.state.eventsData[0].map((eventy) =>
              <div className="event-box">
                <div className="top">
                  <div className="boxHeader">
                    <h3>EVENT DETAILS</h3></div>
                  <hr></hr>
                  <div className="bottom">
                    <div className="eventColumn-left">
                      <div className="event-name">
                        <p className="eventHeaders"><strong>Venue</strong></p>
                        <p className="eventInfo">{eventy.venue.name}</p></div>
                      <div className="event-country">
                        <p className="eventHeaders"><strong>Country</strong></p>
                        <p className="eventInfo">{eventy.venue.country}</p></div>
                    </div>
                    <div className="eventColumn-right">
                      <div className="event-city">
                        <p className="eventHeaders"><strong>City</strong></p>
                        <p className="eventInfo">{eventy.venue.city}</p></div>
                      <div className="event-date">
                        <p className="eventHeaders"><strong>Date</strong></p>
                        <p className="eventInfo"><span>
                          {
                            moment(eventy.datetime, "YYYY-MM-DDThh:mm:ss").format("Do MMM, YYYY")
                          }
                        </span></p></div>
                    </div>
                  </div>
                </div>
              </div>


            ) :
            <div></div>
          }
        </div>
      </div>



    );
  }
}

export default App;
