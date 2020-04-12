import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
// import cuid from 'cuid';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';
import LoadingComponent from '../../../layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

const mapState = (state) => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent,
};

class EventDashboard extends Component {
  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent />
    return (
      <Grid>
        <GridColumn width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </GridColumn>
        <GridColumn width={6}>
          <EventActivity />
        </GridColumn>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
  ) (firestoreConnect([{collection:'events'}])(EventDashboard));
