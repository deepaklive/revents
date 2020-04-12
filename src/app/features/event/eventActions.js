import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENT } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../data/mockApi';
import { toastr } from 'react-redux-toastr';

export const createEvent = (event) => {
     return async dispatch => {
          try {
               dispatch({
                    type: CREATE_EVENT,
                    payload: {
                         event
                    }
               })
               toastr.success('Success!', 'Event has been created');
          } catch (error) {
               console.log(error);
               toastr.error('Oops!', 'Something went wrong');
          }
     }

}

export const updateEvent = (event) => {
     return async dispatch => {
          try {
               dispatch({
                    type: UPDATE_EVENT,
                    payload: {
                         event
                    }
               })
               toastr.success('Success!', 'Event has been updated');
          } catch (error) {
               console.log(error);
               toastr.error('Oops!', 'Something went wrong');
          }
     }
}

export const deleteEvent = (eventId) => {
     return async dispatch => {
          try {
               dispatch({
                    type: DELETE_EVENT,
                    payload: {
                         eventId
                    }
               })
               toastr.success('Success!', 'Event has been deleted');
          } catch (error) {
               console.log(error);
               toastr.error('Oops!', 'Something went wrong');
          }
     }
}

export const loadEvent = () => {
     return async dispatch => {
          try {
               dispatch(asyncActionStart())
               let events = await fetchSampleData();
               dispatch({ type: FETCH_EVENT, payload: { events } });
               dispatch(asyncActionFinish());
          } catch (error) {
               console.log(error);
               dispatch(asyncActionError());
          }
     }
}