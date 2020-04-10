import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
// import cuid from 'cuid';
import { connect }  from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';

const mapState = (state) => ({
  events: state.events
})

const actions  = {
    createEvent,
    updateEvent,
    deleteEvent
}

class EventDashboard extends Component {
  // state = {
  //   isOpen: false,
  //   selectedEvent: null
  // };

  // handleIsOpenToggle = () => {
  //   this.setState(({ isOpen }) => ({
  //     isOpen: !isOpen,
  //   }));
  // };

  // handleCreateFormOpen = () => {
  //   this.setState({
  //     isOpen: true,
  //     selectedEvent: null,
  //   });
  // };

  // handleFormCancel = () => {
  //   this.setState({
  //     isOpen: false,
  //   });
  // };

  // handleCreateEvent = (newEvent) => {
  //   newEvent.id = cuid();
  //   newEvent.hostPhotoURL = '/assets/user.png';
  //   this.props.createEvent(newEvent);
  //   // this.setState(({events}) => ({
  //   //   isOpen: false
  //   // }));
  // };

  // handleSelectEvent = event => {
  //   this.setState({
  //     selectedEvent: event,
  //     isOpen: true,
  //   });
  // };

  // handleUpdateEvent = updatedEvent => {
  //   this.props.updateEvent(updatedEvent);
  //   // this.setState(({events}) => ({
  //   //   isOpen: false,
  //   //   selectedEvent: null
  //   // }))
  // };

  handleDeleteEvent = id => {
    this.props.deleteEvent(id);
  };

  render() {
    // const {isOpen, selectedEvent } = this.state;
    const {events} = this.props;
    return (
      <Grid>
        <GridColumn width={10}>
          <EventList events={events} deleteEvent= {this.handleDeleteEvent} />
        </GridColumn>
        <GridColumn width={6}>
          <h2>Activity Feed</h2>
          {/* <Button
            onClick={this.handleCreateFormOpen}
            positive
            content="Create Event"
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              updateEvent = {this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleFormCancel}
            /> */}
          
        </GridColumn>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
