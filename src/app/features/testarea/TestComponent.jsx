import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testAction';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';

import { openModal } from '../modals/modalActions';

// mapStateToProps => mapState
const mapState = (state) => ({
  data: state.test.data,
});

// mapDispatchToProps => actions
const actions = {
  incrementCounter,
  decrementCounter,
  openModal,
};

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the answer is : {data} </h3>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
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
