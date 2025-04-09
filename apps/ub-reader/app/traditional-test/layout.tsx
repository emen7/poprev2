import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traditional Theme Test - UB Reader',
  description: 'A test page for the traditional theme implementation of the UB Reader',
};

export default function TraditionalTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      {children}
    </>
  );
}
