import { Html, Main, Head, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <title>Nuber</title>
        </Head>
      <body className='min-h-screen bg-gray-100 text-center antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
