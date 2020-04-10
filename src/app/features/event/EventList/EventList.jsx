import React, { Component , Fragment } from 'react'
import EventListitem from './EventListItem'

class EventList extends Component {
     render() {
          const {events, deleteEvent} = this.props;
          return (
                <Fragment>
                    {events.map(event => (
                         <EventListitem key={event.id} event={event} deleteEvent ={deleteEvent}/>
                    ))}
               </Fragment>
          )
     }
}

export default EventList;