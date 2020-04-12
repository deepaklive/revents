import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { registerUser } from '../authActions';

const actions = {
  registerUser,
};

const RegisterForm = ({ handleSubmit, registerUser, error }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Display Name"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />

          {error && (
            <div>
              <Label basic color="red">
                {error}
              </Label>
              <br />
            </div>
          )}
          <br/>
          <Button fluid size="large" color="teal">
            Register
          </Button>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm' })(RegisterForm));
