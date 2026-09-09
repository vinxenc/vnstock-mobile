import { Button } from '@lynx-js/lynx-ui';
import { useNavigate } from 'react-router';

import './pages.css';

export function About() {
  const nav = useNavigate();

  return (
    <view className="Page">
      <view className="Hero">
        <text className="Brand">About</text>
        <text className="Tagline">
          Built with ReactLynx and the @lynx-js/lynx-ui component library.
        </text>
      </view>

      <view className="Actions">
        <Button className="PrimaryButton" onClick={() => nav(-1)}>
          <text className="ButtonLabel">Go back</text>
        </Button>
      </view>
    </view>
  );
}
