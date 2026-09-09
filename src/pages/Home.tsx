import { Button } from '@lynx-js/lynx-ui';
import { useNavigate } from 'react-router';

import './pages.css';

export function Home() {
  const nav = useNavigate();

  return (
    <view className="Page">
      <view className="Hero">
        <text className="Brand">VNStock</text>
        <text className="Tagline">Vietnamese market data, on Lynx</text>
      </view>

      <view className="Actions">
        <Button className="PrimaryButton" onClick={() => nav('/demo')}>
          <text className="ButtonLabel">View ReactLynx demo</text>
        </Button>
        <text className="Link" bindtap={() => nav('/about')}>
          About this app
        </text>
      </view>
    </view>
  );
}
