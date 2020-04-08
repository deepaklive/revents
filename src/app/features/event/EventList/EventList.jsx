import React, { Component , Fragment } from 'react'
import EventListitem from './EventListItem'

class EventList extends Component {
     render() {
          const {events, selectEvent, deleteEvent} = this.props;
          return (
                <Fragment>
                    {events.map(event => (
                         <EventListitem key={event.id} event={event} selectEvent={selectEvent} deleteEvent ={deleteEvent}/>
                    ))}
               </Fragment>
          )
     }
}

export default EventList;