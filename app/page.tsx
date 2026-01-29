'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function Home() {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load HTML content
    fetch('/landing.html')
      .then(res => res.text())
      .then(html => {
        // Extract body content
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)/i)
        if (bodyMatch) {
          let bodyContent = bodyMatch[1]
          // Remove vercel scripts and form embed scripts (loaded separately via Next Script)
          bodyContent = bodyContent
            .replace(/<script[^>]*src="[^"]*\/_vercel\/[^"]*"[^>]*><\/script>/gi, '')
            .replace(/<script[^>]*src="[^"]*hsforms\.net[^"]*"[^>]*><\/script>/gi, '')
            .replace(/<script[^>]*src="[^"]*msgsndr\.com[^"]*"[^>]*><\/script>/gi, '')
          setContent(bodyContent)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading content:', err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (content) {
      // Execute inline scripts after content is loaded
      const scripts = document.querySelectorAll('main script')
      scripts.forEach(script => {
        const newScript = document.createElement('script')
        if (script.textContent) {
          newScript.textContent = script.textContent
          script.parentNode?.replaceChild(newScript, script)
        }
      })
    }
  }, [content])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#1a1a2e'
      }}>
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>Carregando...</div>
      </div>
    )
  }

  return (
    <>
      <main
        id="main-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="lazyOnload"
      />
    </>
  )
}
