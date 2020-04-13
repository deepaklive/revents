import { SubmissionError, reset } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { asyncActionStart, asyncActionFinish } from '../async/asyncActions';
import { toastr } from 'react-redux-toastr';

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


export const updatePassword = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    try {
      await user.updatePassword(creds.newPassword1);
      await dispatch(reset('account'));
      toastr.success('Success', 'Your password has been updated');
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
}

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

export const socialLogin = (selectedProvider) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      dispatch(closeModal());
      const user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      });
      console.log(user);
      if (user.additionalUserInfo.isNewUser) {
        let newUser = {
          uid: firebase.auth().currentUser.uid,
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        const {profile,...userToSet} = newUser;
        ///console.log('NEW USER : ' + userToSet );
        await firebase
          .firestore()
          .collection('users')
          .doc(newUser.uid)
          .set(userToSet);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
