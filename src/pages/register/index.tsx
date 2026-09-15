import { Button } from '@lynx-js/lynx-ui';
import { useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';

import { AuthScreen } from '../../components/AuthScreen/index.js';
import { Field, type FieldInputEvent } from '../../components/Field/index.js';
import { validateRegister, type RegisterErrors } from '../../lib/authValidation.js';

export function Register() {
  const nav = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onName = (e: FieldInputEvent) => setName(e.detail.value);
  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onEmail = (e: FieldInputEvent) => setEmail(e.detail.value);
  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onPassword = (e: FieldInputEvent) => setPassword(e.detail.value);
  /* istanbul ignore next -- native <input> events are not dispatchable in the test env */
  const onConfirm = (e: FieldInputEvent) => setConfirm(e.detail.value);

  const toggleAgreed = () => setAgreed((v) => !v);

  const handleSubmit = () => {
    setErrors(validateRegister({ name, email, password, confirm, agreed }));
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
          <text className="AuthCard-title">Create an account</text>
          <text className="AuthCard-description">
            Start following Vietnamese stocks in minutes.
          </text>
        </view>

        <Field
          label="Name"
          type="text"
          placeholder="Nguyen Van A"
          error={errors.name}
          bindinput={onName}
        />

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
          placeholder="At least 6 characters"
          error={errors.password}
          bindinput={onPassword}
        />

        <Field
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirm}
          bindinput={onConfirm}
        />

        <view className="TermsRow" bindtap={toggleAgreed}>
          <view className={`TermsCheckbox${agreed ? ' is-checked' : ''}`}>
            {agreed ? <text className="TermsCheckbox-mark">✓</text> : null}
          </view>
          <text className="TermsRow-label">
            I agree to the <text className="TermsRow-link">Terms</text> and{' '}
            <text className="TermsRow-link">Privacy Policy</text>
          </text>
        </view>
        {errors.terms ? <text className="Field-error">{errors.terms}</text> : null}

        <Button className="PrimaryButton" onClick={handleSubmit}>
          <text className="PrimaryButton-label">Create account</text>
        </Button>
      </view>

      <view className="AuthFooter">
        <text className="AuthFooter-text">Already have an account?</text>
        <text className="AuthFooter-link" bindtap={() => nav('/login')}>
          Sign in
        </text>
      </view>
    </AuthScreen>
  );
}
