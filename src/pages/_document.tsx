import { Html, Main, Head, NextScript } from 'next/document'

export default function Document() {
    const maps_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY

  return (
    <Html lang="en" data-theme="light">
        <Head>
            <title>Nuber</title>
            <script key="googleMapScript" src={`https://maps.googleapis.com/maps/api/js?key=${maps_key}&libraries=places`}></script>
        </Head>
      <body className='min-h-screen bg-gray-100 text-center antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
