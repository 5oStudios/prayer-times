import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { dir } from 'i18next';
import { theme } from '../../theme';
import 'normalize.css';
import Providers from './providers';
import { languages } from '../i18n/settings';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export const metadata = {
  title: 'Prayer Times',
  description: 'Prayer times for Muslims',
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <Providers>
      <html lang={lng} dir={dir(lng)}>
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <title>{metadata.title}</title>
        </head>
        <body>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </body>
      </html>
    </Providers>
  );
}
