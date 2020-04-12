import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { asyncActionStart, asyncActionFinish } from '../async/asyncActions';

export const login = (creds) => {
     return async (dispatch, getState, { getFirebase }) => {
          const firebase = getFirebase();
          try {
               await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
               dispatch(closeModal());
          } catch (error) {
               console.log(error);
               throw new SubmissionError({
                    _error: error.message
               })
          }
     };
};

// export const registerUser = (user) => {
//      return async (dispatch, getState, { getFirebase, getFirestore }) => {
//           const firebase = getFirebase;
//           const firestore = getFirestore;

//           try {
//                let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
//                console.log(createdUser);

//                await createdUser.user.updateProfile({
//                     displayName: user.displayName
//                });
//                let newUser = {
//                     displayName: user.displayName,
//                     createdAt: firestore.FieldValue.serverTimestamp()
//                };
//                await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
//                dispatch(closeModal());

//           } catch (error) {
//                console.log(error);
//           }
//      }
// }

export const registerUser = user => async (
     dispatch,
     getState,
     { getFirebase }
   ) => {
     const firebase = getFirebase();
    
     try {
       dispatch(asyncActionStart());
       let createdUser = await firebase
         .auth()
         .createUserWithEmailAndPassword(user.email, user.password);
       console.log(createdUser);
       await createdUser.user.updateProfile({
         displayName: user.displayName
       });
    
       let newUser = {
         uid: firebase.auth().currentUser.uid,
         displayName: user.displayName,
         createdAt: firebase.firestore.FieldValue.serverTimestamp()
       };
       await firebase
         .firestore()
         .collection('users')
         .doc(newUser.uid)
         .set(newUser);
       dispatch(closeModal());
     } catch (error) {
       console.log(error);
       throw new SubmissionError({ _error: error.message });
     } finally {
       dispatch(asyncActionFinish());
     }
   };
    
