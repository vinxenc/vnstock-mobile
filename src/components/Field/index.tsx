import type { ReactNode } from '@lynx-js/react';

export type FieldInputEvent = { detail: { value: string } };

interface FieldProps {
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  error?: string;
  /** Optional trailing element on the label row (e.g. a "Forgot?" link). */
  accessory?: ReactNode;
  bindinput: (e: FieldInputEvent) => void;
}

export function Field({
  label,
  placeholder,
  type,
  error,
  accessory,
  bindinput,
}: FieldProps) {
  return (
    <view className="Field">
      <view className="FieldLabelRow">
        <text className="Field-label">{label}</text>
        {accessory}
      </view>
      <input
        className={`Field-input${error ? ' has-error' : ''}`}
        type={type}
        placeholder={placeholder}
        bindinput={bindinput}
      />
      {error ? <text className="Field-error">{error}</text> : null}
    </view>
  );
}
