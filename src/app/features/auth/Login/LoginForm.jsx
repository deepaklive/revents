import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../common/form/TextInput';
import { connect } from 'react-redux';
import { combineValidators, composeValidators, isRequired } from 'revalidate';
import { isValidEmail , customIsRequired } from '../../../common/validate/validateUtil';

import { login, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';


const actions = {
  login,
  socialLogin
};

const validate = combineValidators({
  email: composeValidators(customIsRequired,isValidEmail)(),
  password: isRequired('password'),
});

const LoginForm = ({ login, socialLogin, handleSubmit, error, invalid, submitting }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)} autoComplete="off">
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && (
          <div>
            <Label basic color="red">
              {error}
            </Label>
            <br />
          </div>
        )}

        <Button disabled={invalid || submitting}  fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>
          Or
          </Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm', validate })(LoginForm));
