import type { ReactNode } from '@lynx-js/react';

import './auth.css';

/**
 * Scrollable shell for the auth screens. The card is vertically centered when
 * it fits, and becomes scrollable once validation errors push it past the
 * viewport height.
 */
export function AuthScreen({ children }: { children: ReactNode }) {
  return (
    <scroll-view className="AuthScroll" scroll-orientation="vertical">
      <view className="AuthPage">{children}</view>
    </scroll-view>
  );
}
