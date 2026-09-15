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
        <Button className="PrimaryButton" onClick={() => nav('/about')}>
          <text className="ButtonLabel">About this app</text>
        </Button>
      </view>
    </view>
  );
}
