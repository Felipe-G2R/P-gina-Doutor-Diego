/**
 * Landing Page - Sessao Estrategica 1.0
 * JavaScript otimizado para alta conversao e performance
 */

import './style.css'

// ========================================
// Intersection Observer para animacoes
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0
      setTimeout(() => {
        entry.target.classList.remove('loading')
        entry.target.classList.add('loaded')
      }, parseInt(delay))
      animateOnScroll.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observar todos os elementos com data-animate
document.querySelectorAll('[data-animate]').forEach(el => {
  animateOnScroll.observe(el)
})

// ========================================
// Contador animado de numeros
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + (target - start) * easeOut)

    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Observer para contadores
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count)
      animateCounter(entry.target, target)
      counterObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.5 })

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el)
})

// ========================================
// FAQ Accordion
// ========================================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement
    const isActive = faqItem.classList.contains('active')

    // Fechar todos os outros
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active')
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false')
    })

    // Toggle o clicado
    if (!isActive) {
      faqItem.classList.add('active')
      button.setAttribute('aria-expanded', 'true')
    }
  })
})

// ========================================
// Mascara de telefone
// ========================================
const whatsappInput = document.getElementById('whatsapp')
if (whatsappInput) {
  whatsappInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '')

    if (value.length > 11) {
      value = value.slice(0, 11)
    }

    if (value.length > 0) {
      value = '(' + value
    }
    if (value.length > 3) {
      value = value.slice(0, 3) + ') ' + value.slice(3)
    }
    if (value.length > 10) {
      value = value.slice(0, 10) + '-' + value.slice(10)
    }

    e.target.value = value
  })
}

// ========================================
// Formulario Submit
// ========================================
const form = document.getElementById('applicationForm')
const submitBtn = document.getElementById('submitBtn')
const modal = document.getElementById('successModal')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Mostrar loading
    const btnText = submitBtn.querySelector('.btn-text')
    const btnLoading = submitBtn.querySelector('.btn-loading')
    btnText.style.display = 'none'
    btnLoading.style.display = 'inline-flex'
    submitBtn.disabled = true

    // Coletar dados
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    // Simular envio (substituir por API real)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Salvar no localStorage para analytics
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]')
      submissions.push({
        ...data,
        timestamp: new Date().toISOString()
      })
      localStorage.setItem('submissions', JSON.stringify(submissions))

      // Mostrar modal de sucesso
      modal.classList.add('active')

      // Reset form
      form.reset()

      // Track conversao (substituir por seu analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'conversion',
          event_label: 'sessao_estrategica'
        })
      }

    } catch (error) {
      console.error('Erro ao enviar:', error)
      alert('Erro ao enviar. Tente novamente.')
    } finally {
      btnText.style.display = 'inline'
      btnLoading.style.display = 'none'
      submitBtn.disabled = false
    }
  })
}

// Fechar modal
window.closeModal = function() {
  modal.classList.remove('active')
}

// Fechar modal clicando fora
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
}

// ========================================
// Urgency Counter (Vagas)
// ========================================
function updateVagasCount() {
  const vagasEl = document.getElementById('vagasCount')
  if (!vagasEl) return

  // Pegar do localStorage ou gerar aleatorio
  let vagas = localStorage.getItem('vagas')
  const lastUpdate = localStorage.getItem('vagasLastUpdate')
  const now = Date.now()

  // Resetar a cada 24h
  if (!vagas || !lastUpdate || (now - parseInt(lastUpdate)) > 86400000) {
    vagas = Math.floor(Math.random() * 5) + 3 // 3-7 vagas
    localStorage.setItem('vagas', vagas)
    localStorage.setItem('vagasLastUpdate', now.toString())
  }

  vagasEl.textContent = vagas
}

updateVagasCount()

// ========================================
// Smooth Scroll para CTAs
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      const headerOffset = 60
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  })
})

// ========================================
// Video Placeholder Click
// ========================================
const playButton = document.getElementById('playButton')
const videoContainer = document.getElementById('videoContainer')

if (playButton && videoContainer) {
  playButton.addEventListener('click', () => {
    // Substituir por video real ou modal de video
    videoContainer.innerHTML = `
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Video Sessao Estrategica"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="border-radius: 16px;"
      ></iframe>
    `
  })
}

// ========================================
// Scroll Progress (opcional)
// ========================================
function updateScrollProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100

  // Pode usar para progress bar ou analytics
  if (scrollPercent > 75) {
    // Usuario leu 75% da pagina
    if (!window.deepScroll) {
      window.deepScroll = true
      // Track engagement
    }
  }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true })

// ========================================
// Performance: Preload de recursos criticos
// ========================================
function preloadResources() {
  // Preload do formulario quando o usuario chegar perto
  const formSection = document.getElementById('aplicar')
  if (formSection) {
    const preloadObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Pre-aquecer conexoes
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = 'https://api.seusite.com' // Substituir pela sua API
        document.head.appendChild(link)
        preloadObserver.disconnect()
      }
    }, { rootMargin: '200px' })

    preloadObserver.observe(formSection)
  }
}

preloadResources()

// ========================================
// Exit Intent Popup (Desktop)
// ========================================
let exitIntentShown = false

document.addEventListener('mouseout', (e) => {
  if (e.clientY < 10 && !exitIntentShown && window.innerWidth > 768) {
    // Verificar se usuario nao converteu ainda
    const hasConverted = localStorage.getItem('converted')
    if (!hasConverted) {
      // Mostrar popup de saida (implementar conforme necessidade)
      exitIntentShown = true
    }
  }
})

// ========================================
// Console Log Branding
// ========================================
console.log(
  '%c Sessao Estrategica 1.0 ',
  'background: #6366f1; color: white; font-size: 16px; padding: 10px; border-radius: 4px;'
)
console.log('Desenvolvido para alta conversao e performance.')

// ========================================
// Service Worker Registration (PWA ready)
// ========================================
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW registration failed:', err))
  })
}
