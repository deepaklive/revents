import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAsync, decrementAsync } from './testAction';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';

import { openModal } from '../modals/modalActions';

// mapStateToProps => mapState
const mapState = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});

// mapDispatchToProps => actions
const actions = {
  incrementAsync,
  decrementAsync,
  openModal
  
};

class TestComponent extends Component {
  render() {
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the answer is : {data} </h3>
        <Button
          name="increment"
          loading={buttonName==='increment' && loading }
          onClick={(e) => incrementAsync (e.target.name)}
          positive
          content="Increment"
        />
        <Button
          name="decrement"
          loading={buttonName==='decrement' && loading }
          onClick={(e) => decrementAsync (e.target.name)}
          negative
          content="Decrement"
        />
        <Button
          onClick={() => openModal('TestModal', { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
        <TestPlaceInput />

        <br />
        <br />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
