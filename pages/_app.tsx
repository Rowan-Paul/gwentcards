import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import type { AppProps } from 'next/app';

import '/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>GWENTcards</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Keep track of which cards you've collected for the Witcher 3 GWENT minigame."
          />
          <meta name="keywords" content="GWENT, cards, minigame, witcher,the witcher 3, game, card, collect, filter" />
          <meta property="og:site_name" content="GWENTcards" />
          <meta property="og:title" content="GWENTcards: collect cards for the Witcher 3 mini game" />
          <meta
            property="og:description"
            content="Keep track of which cards you've collected for the Witcher 3 GWENT minigame."
          />
          <meta property="og:image" content="/icon.png" />
          <meta property="og:url" content="https://gwentcards.net" />
        </Head>

        <Component {...pageProps} />
        <Analytics />
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
