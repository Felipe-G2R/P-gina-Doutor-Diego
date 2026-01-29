import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SESSÃO ESTRATÉGICA SIMPLES V2 – NOVO FORMS – Diego Corrêa',
  description: 'Sessão Estratégica Gratuita com Dr. Diego Corrêa - Descubra como transformar sua clínica médica em um negócio que fatura R$100.000/mês. Mentoria exclusiva para médicos dermatologistas, dentistas e profissionais de saúde.',
  keywords: 'mentoria para médicos, escalar clínica médica, faturamento consultório, Diego Corrêa, gestão de clínicas, consultório rentável, marketing médico, dermatologista empresário',
  authors: [{ name: 'Dr. Diego Corrêa Instituto' }],
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    type: 'website',
    url: 'https://diegocorreainstituto.com.br/sesv2-2/',
    title: 'Sessão Estratégica Gratuita | Dr. Diego Corrêa - Escale sua Clínica',
    description: 'Agende sua sessão estratégica gratuita e descubra como escalar sua clínica médica para faturar R$100.000 por mês com equilíbrio entre vida pessoal e profissional.',
    siteName: 'Dr. Diego Corrêa Instituto',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sessão Estratégica | Dr. Diego Corrêa',
    description: 'Mentoria exclusiva para médicos escalarem suas clínicas com método comprovado.',
  },
  metadataBase: new URL('https://diegocorreainstituto.com.br'),
  alternates: {
    canonical: 'https://diegocorreainstituto.com.br/sesv2-2/',
  },
  other: {
    'theme-color': '#1a1a2e',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '402956308839839');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=402956308839839&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
