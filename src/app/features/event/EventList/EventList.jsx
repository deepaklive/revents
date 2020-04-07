import React, { Component , Fragment } from 'react'
import EventListitem from './EventListItem'

class EventList extends Component {
     render() {
          return (
                <Fragment>
                    {this.props.events.map(event => (
                         <EventListitem key={event.id} event={event}/>
                    ))}
               </Fragment>
          )
     }
}

export default EventList;