import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './testAction';
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';


// mapStateToProps => mapState
const mapState = (state) => ({
  data: state.test.data
})

// mapDispatchToProps => actions
const actions  = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
  render() {
    const {data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the answer is : {data} </h3>
        <Button onClick ={incrementCounter} positive content='Increment' />
        <Button onClick ={decrementCounter} negative content='Decrement' />
        <br/>
        <br/>
        <TestPlaceInput />

        <br/>
        <br/>
        <SimpleMap />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
