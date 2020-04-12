import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';

import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { registerUser, socialLogin } from '../authActions';
import { combineValidators, isRequired, composeValidators, matchesField } from 'revalidate';
import { isValidEmail , customIsRequired } from '../../../common/validate/validateUtil'
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  displayName: isRequired('Display Name'),
  email: composeValidators(customIsRequired,isValidEmail)(),
  password: isRequired('password'),
  confirmPassword: matchesField('password')({
    message: 'Passwords do not match',
  }),
});

const RegisterForm = ({
  handleSubmit,
  registerUser,
  socialLogin,
  error,
  invalid,
  submitting,
}) => {
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
          <Field
            name="confirmPassword"
            type="password"
            component={TextInput}
            placeholder="confirm Password"
          />

          {error && (
            <div>
              <Label basic color="red">
                {error}
              </Label>
              <br />
            </div>
          )}
          <br />
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin socialLogin={socialLogin}/>
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
