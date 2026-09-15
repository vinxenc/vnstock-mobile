import { Button } from '@lynx-js/lynx-ui';
import { useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';

import { AuthScreen } from '../shared/AuthScreen.js';
import { Field, type FieldInputEvent } from '../shared/Field.js';
import { validateLogin, type LoginErrors } from '../shared/authValidation.js';

export function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onEmail = (e: FieldInputEvent) => setEmail(e.detail.value);
  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onPassword = (e: FieldInputEvent) => setPassword(e.detail.value);

  const handleSubmit = () => {
    setErrors(validateLogin(email, password));
    // TODO: on success, call the auth API and navigate into the app.
  };

  return (
    <AuthScreen>
      <view className="AuthBrand">
        <text className="AuthBrand-name">VNStock</text>
        <view className="AuthBrand-ticker">
          <text className="AuthBrand-tickerText">▲ VN-Index</text>
        </view>
      </view>

      <view className="AuthCard">
        <view className="AuthCard-header">
          <text className="AuthCard-title">Welcome back</text>
          <text className="AuthCard-description">
            Sign in to track the Vietnamese market.
          </text>
        </view>

        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          bindinput={onEmail}
        />

        <Field
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password}
          accessory={<text className="InlineLink">Forgot?</text>}
          bindinput={onPassword}
        />

        <Button className="PrimaryButton" onClick={handleSubmit}>
          <text className="PrimaryButton-label">Sign in</text>
        </Button>
      </view>

      <view className="AuthFooter">
        <text className="AuthFooter-text">Don't have an account?</text>
        <text className="AuthFooter-link" bindtap={() => nav('/register')}>
          Sign up
        </text>
      </view>
    </AuthScreen>
  );
}
