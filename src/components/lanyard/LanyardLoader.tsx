'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Dynamically import the Lanyard with SSR disabled because it relies on
// browser-only APIs (window, WebGL, Rapier physics).
const LanyardClient = dynamic(() => import('./Lanyard'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
      }}
    >
      LOADING 3D CARD...
    </div>
  ),
});

type LanyardProps = ComponentProps<typeof LanyardClient>;

export default function LanyardLoader(props: LanyardProps) {
  return <LanyardClient {...props} />;
}
