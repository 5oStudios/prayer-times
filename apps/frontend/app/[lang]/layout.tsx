import '@mantine/core/styles.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/carousel/styles.css';
import { theme } from '../../theme';
import 'normalize.css';
import ReduxProviders from './redux-providers';
import DictionaryProvider from './dictionary-provider';
import { getDictionary } from '../i18n/dictionaries';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export async function generateMetadata({ lang }: { lang: string }) {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.platform.title,
    description: dictionary.platform.title,
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);
  return (
    <DictionaryProvider dictionary={dictionary}>
      <html lang={lang}>
        <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <title>{dictionary.platform.title}</title>
        </head>
        <body className="">
          <MantineProvider theme={theme}>
            <ReduxProviders>{children}</ReduxProviders>
          </MantineProvider>
        </body>
      </html>
    </DictionaryProvider>
  );
}
