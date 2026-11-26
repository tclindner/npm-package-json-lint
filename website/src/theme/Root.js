import React from 'react';
import {SpeedInsights} from '@vercel/speed-insights/react';

// Docusaurus renders Root around every page, so this is the app-wide layout.
export default function Root({children}) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}
