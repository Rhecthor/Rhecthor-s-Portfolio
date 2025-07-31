// Configuration
const CONFIG = {
  typewriterTexts: ["Front-End Developer", "React.js Specialist", "UI/UX Enthusiast"],
  chatResponses: [
    "Thanks for reaching out! I'd love to help with your project.",
    "That sounds like an exciting opportunity! Let me know more details.",
    "I'm available for new projects. What do you have in mind?",
    "Great question! I specialize in modern web technologies.",
    "I'd be happy to discuss your requirements. When would be a good time to talk?",
    "Why don't you use React and Tailwind for you project instead of Next.js",
  ],
}

// Utility Functions
const utils = {
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle: (func, limit) => {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  isElementInViewport: (el) => {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  },

  getRandomResponse: (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
  },
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loading-screen")
    this.init()
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hide()
      }, 2000)
    })
  }

  hide() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("fade-out")
      setTimeout(() => {
        this.loadingScreen.style.display = "none"
      }, 500)
    }
  }
}

// Navigation
class Navigation {
  constructor() {
    this.navbar = document.querySelector(".navbar")
    this.hamburger = document.querySelector(".hamburger")
    this.navMenu = document.querySelector(".nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.themeToggle = document.getElementById("theme-toggle")

    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupScrollEffect()
    this.setupSmoothScrolling()
    this.setupActiveLinks()
    this.setupThemeToggle()
  }

  setupMobileMenu() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.hamburger.classList.toggle("active")
        this.navMenu.classList.toggle("active")
      })

      // Close mobile menu when clicking on a link
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.hamburger.classList.remove("active")
          this.navMenu.classList.remove("active")
        })
      })
    }
  }

  setupScrollEffect() {
    const handleScroll = utils.throttle(() => {
      if (window.scrollY > 100) {
        this.navbar.classList.add("scrolled")
      } else {
        this.navbar.classList.remove("scrolled")
      }
    }, 100)

    window.addEventListener("scroll", handleScroll)
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          const offsetTop = target.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll("section[id]")
    const handleScroll = utils.throttle(() => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute("id")
        }
      })

      this.navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    }, 100)

    window.addEventListener("scroll", handleScroll)
  }

  setupThemeToggle() {
    if (this.themeToggle) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme)
        this.updateThemeIcon(savedTheme)
      }

      this.themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme")
        const newTheme = currentTheme === "light" ? "dark" : "light"

        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        this.updateThemeIcon(newTheme)
      })
    }
  }

  updateThemeIcon(theme) {
    const icon = this.themeToggle.querySelector("i")
    if (theme === "light") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }
}

// Typewriter Effect
class TypewriterEffect {
  constructor(element, texts) {
    this.element = element
    this.texts = texts
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false
    this.typeSpeed = 100
    this.deleteSpeed = 50
    this.pauseTime = 2000

    this.init()
  }

  init() {
    if (this.element) {
      setTimeout(() => this.type(), 1000)
    }
  }

  type() {
    const currentText = this.texts[this.textIndex]

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1)
      this.charIndex--
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1)
      this.charIndex++
    }

    let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed

    if (!this.isDeleting && this.charIndex === currentText.length) {
      speed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
      speed = 500
    }

    setTimeout(() => this.type(), speed)
  }
}

// Animated Counter
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element
    this.target = target
    this.duration = duration
    this.hasAnimated = false
  }

  animate() {
    if (this.hasAnimated) return

    this.hasAnimated = true
    let start = 0
    const increment = this.target / (this.duration / 16)

    const timer = setInterval(() => {
      start += increment
      this.element.textContent = Math.floor(start)

      if (start >= this.target) {
        this.element.textContent = this.target
        clearInterval(timer)
      }
    }, 16)
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.counters = []
    this.init()
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry.target)
        }
      })
    }, observerOptions)

    this.setupObservers()
  }

  setupObservers() {
    // Observe stats counters
    const statNumbers = document.querySelectorAll(".stat-number[data-target]")
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      const counter = new AnimatedCounter(stat, target)
      this.counters.push({ element: stat, counter })
      this.observer.observe(stat.closest(".stats") || stat)
    })

    // Observe skill bars
    const skillBars = document.querySelectorAll(".skill-progress[data-width]")
    skillBars.forEach((bar) => {
      this.observer.observe(bar)
    })

    // Observe project cards
    const projectCards = document.querySelectorAll(".project-card")
    projectCards.forEach((card) => {
      this.observer.observe(card)
    })

    // Observe service cards
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
      this.observer.observe(card)
    })
  }

  handleIntersection(target) {
    // Handle counter animations
    const counterData = this.counters.find((c) => c.element === target || target.contains(c.element))
    if (counterData) {
      counterData.counter.animate()
    }

    // Handle skill bar animations
    if (target.classList.contains("skill-progress")) {
      const width = target.getAttribute("data-width")
      target.style.width = width
    }

    // Handle card animations
    if (target.classList.contains("project-card") || target.classList.contains("service-card")) {
      target.style.opacity = "0"
      target.style.transform = "translateY(50px)"
      target.style.transition = "all 0.6s ease"

      setTimeout(() => {
        target.style.opacity = "1"
        target.style.transform = "translateY(0)"
      }, 100)
    }
  }
}

// Project Filtering
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn")
    this.projectCards = document.querySelectorAll(".project-card")

    this.init()
  }

  init() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter")
        this.filterProjects(filter)
        this.updateActiveButton(button)
      })
    })
  }

  filterProjects(filter) {
    this.projectCards.forEach((card) => {
      const categories = card.getAttribute("data-category")

      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.5s ease"
      } else {
        card.style.display = "none"
      }
    })
  }

  updateActiveButton(activeButton) {
    this.filterButtons.forEach((button) => {
      button.classList.remove("active")
    })
    activeButton.classList.add("active")
  }
}

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.testimonials = document.querySelectorAll(".testimonial-card")
    this.navDots = document.querySelectorAll(".nav-dot")
    this.currentSlide = 0
    this.autoSlideInterval = null

    this.init()
  }

  init() {
    if (this.testimonials.length === 0) return

    this.setupNavigation()
    this.startAutoSlide()
    this.setupHoverPause()
  }

  setupNavigation() {
    this.navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index)
      })
    })
  }

  goToSlide(index) {
    // Hide current slide
    this.testimonials[this.currentSlide].classList.remove("active")
    this.navDots[this.currentSlide].classList.remove("active")

    // Show new slide
    this.currentSlide = index
    this.testimonials[this.currentSlide].classList.add("active")
    this.navDots[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.testimonials.length
    this.goToSlide(nextIndex)
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
    }
  }

  setupHoverPause() {
    const slider = document.querySelector(".testimonials-slider")
    if (slider) {
      slider.addEventListener("mouseenter", () => this.stopAutoSlide())
      slider.addEventListener("mouseleave", () => this.startAutoSlide())
    }
  }
}

// FAQ Accordion
class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item")
    this.init()
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        this.toggleItem(item)
      })
    })
  }

  toggleItem(item) {
    const isActive = item.classList.contains("active")

    // Close all items
    this.faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  }
}

// Contact Form Handler
class ContactForm {
  constructor() {
    this.form = document.querySelector(".contact-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    const formData = new FormData(this.form)
    const data = Object.fromEntries(formData)

    // Validate form
    if (!this.validateForm(data)) {
      return
    }

    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    try {
      // Simulate API call
      await this.simulateSubmission(data)

      // Show success message
      this.showNotification("Message sent successfully! I'll get back to you soon.", "success")
      this.form.reset()
    } catch (error) {
      this.showNotification("Failed to send message. Please try again.", "error")
    } finally {
      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  validateForm(data) {
    const required = ["name", "email", "service", "message"]
    const missing = required.filter((field) => !data[field])

    if (missing.length > 0) {
      this.showNotification(`Please fill in: ${missing.join(", ")}`, "error")
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      this.showNotification("Please enter a valid email address", "error")
      return false
    }

    return true
  }

  simulateSubmission(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form submitted:", data)
        resolve()
      }, 2000)
    })
  }

  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "var(--success-color)" : "var(--error-color)"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            box-shadow: var(--shadow-medium);
            animation: slideInRight 0.3s ease;
        `

    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.removeNotification(notification)
    }, 5000)

    // Close button
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      this.removeNotification(notification)
    })
  }

  removeNotification(notification) {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }
}

// Newsletter Form
class NewsletterForm {
  constructor() {
    this.form = document.querySelector(".newsletter-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const email = this.form.querySelector('input[type="email"]').value
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    if (!this.validateEmail(email)) {
      this.showMessage("Please enter a valid email address", "error")
      return
    }

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...'
    submitBtn.disabled = true

    try {
      await this.simulateSubscription(email)
      this.showMessage("Successfully subscribed to newsletter!", "success")
      this.form.reset()
    } catch (error) {
      this.showMessage("Subscription failed. Please try again.", "error")
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  simulateSubscription(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Newsletter subscription:", email)
        resolve()
      }, 1500)
    })
  }

  showMessage(message, type) {
    const messageEl = document.createElement("div")
    messageEl.className = `newsletter-message ${type}`
    messageEl.textContent = message
    messageEl.style.cssText = `
            margin-top: 1rem;
            padding: 0.5rem;
            border-radius: var(--border-radius);
            text-align: center;
            color: ${type === "success" ? "var(--success-color)" : "var(--error-color)"};
            background: ${type === "success" ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 71, 87, 0.1)"};
            border: 1px solid ${type === "success" ? "var(--success-color)" : "var(--error-color)"};
        `

    // Remove existing message
    const existingMessage = this.form.querySelector(".newsletter-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    this.form.appendChild(messageEl)

    setTimeout(() => {
      messageEl.remove()
    }, 3000)
  }
}

// Chat Widget
class ChatWidget {
  constructor() {
    this.chatToggle = document.getElementById("chat-toggle")
    this.chatWindow = document.getElementById("chat-window")
    this.chatMinimize = document.getElementById("chat-minimize")
    this.chatInput = document.getElementById("chat-input")
    this.chatSend = document.getElementById("chat-send")
    this.chatMessages = document.getElementById("chat-messages")
    this.isOpen = false

    this.init()
  }

  init() {
    if (!this.chatToggle) return

    this.setupEventListeners()
    this.addWelcomeMessage()
  }

  setupEventListeners() {
    this.chatToggle.addEventListener("click", () => this.toggleChat())
    this.chatMinimize.addEventListener("click", () => this.closeChat())
    this.chatSend.addEventListener("click", () => this.sendMessage())
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage()
      }
    })
  }

  toggleChat() {
    this.isOpen = !this.isOpen
    this.chatWindow.classList.toggle("active", this.isOpen)

    if (this.isOpen) {
      this.chatInput.focus()
      this.hideNotification()
    }
  }

  closeChat() {
    this.isOpen = false
    this.chatWindow.classList.remove("active")
  }

  sendMessage() {
    const message = this.chatInput.value.trim()
    if (!message) return

    this.addMessage(message, "user")
    this.chatInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      const response = utils.getRandomResponse(CONFIG.chatResponses)
      this.addMessage(response, "bot")
    }, 1000)
  }

  addMessage(text, sender) {
    const messageEl = document.createElement("div")
    messageEl.className = `message ${sender}-message`

    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    messageEl.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `

    this.chatMessages.appendChild(messageEl)
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight
  }

  addWelcomeMessage() {
    // Add initial welcome message after a delay
    setTimeout(() => {
      if (!this.isOpen) {
        this.showNotification()
      }
    }, 5000)
  }

  showNotification() {
    const notification = this.chatToggle.querySelector(".chat-notification")
    if (notification) {
      notification.style.display = "flex"
    }
  }

  hideNotification() {
    const notification = this.chatToggle.querySelector(".chat-notification")
    if (notification) {
      notification.style.display = "none"
    }
  }
}

// Project Modal
class ProjectModal {
  constructor() {
    this.modal = document.getElementById("project-modal")
    this.modalTitle = document.getElementById("modal-title")
    this.modalContent = document.getElementById("modal-content")
    this.closeBtn = document.querySelector(".modal-close")

    this.projectData = {
      ecomarket: {
        title: "EcoMarket - Sustainable E-Commerce Platform",
        description:
          "A comprehensive e-commerce platform built with React and Node.js, featuring advanced product filtering, real-time inventory management, and integrated payment processing.",
        features: [
          "Advanced product filtering and search",
          "Real-time inventory management",
          "Integrated Stripe payment processing",
          "User reviews and ratings system",
          "Wishlist and favorites functionality",
          "Admin dashboard with analytics",
          "Mobile-responsive design",
          "SEO optimized",
        ],
        technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS S3", "Redis"],
        stats: {
          users: "10,000+",
          rating: "4.9/5",
          conversion: "12.5%",
        },
      },
      dataviz: {
        title: "DataViz Pro - AI Analytics Dashboard",
        description:
          "Real-time analytics dashboard with AI-powered insights, interactive charts, and predictive analytics for business intelligence.",
        features: [
          "Real-time data visualization",
          "AI-powered predictive analytics",
          "Interactive charts and graphs",
          "Custom report generation",
          "Data export capabilities",
          "Multi-user collaboration",
          "API integrations",
          "Mobile dashboard",
        ],
        technologies: ["Vue.js", "D3.js", "Python", "TensorFlow", "PostgreSQL", "Docker"],
        stats: {
          records: "1M+",
          performance: "Real-time",
          accuracy: "98%",
        },
      },
    }

    this.init()
  }

  init() {
    if (!this.modal) return

    this.setupEventListeners()
    window.openProjectModal = (projectId) => this.openModal(projectId)
  }

  setupEventListeners() {
    this.closeBtn.addEventListener("click", () => this.closeModal())
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.style.display === "block") {
        this.closeModal()
      }
    })
  }

  openModal(projectId) {
    const project = this.projectData[projectId]
    if (!project) return

    this.modalTitle.textContent = project.title
    this.modalContent.innerHTML = this.generateModalContent(project)
    this.modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    this.modal.style.display = "none"
    document.body.style.overflow = "auto"
  }

  generateModalContent(project) {
    return `
            <div class="modal-project-content">
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    <h4>Key Features</h4>
                    <ul>
                        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
                
                <div class="project-technologies">
                    <h4>Technologies Used</h4>
                    <div class="tech-tags">
                        ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                    </div>
                </div>
                
                <div class="project-statistics">
                    <h4>Project Statistics</h4>
                    <div class="stats-grid">
                        ${Object.entries(project.stats)
                          .map(
                            ([key, value]) => `
                            <div class="stat-item">
                                <span class="stat-value">${value}</span>
                                <span class="stat-label">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
                
                <div class="project-actions">
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Demo
                    </a>
                    <a href="tradereal.netlify.app" class="btn btn-secondary">
                        <i class="fab fa-github"></i>
                        View Source Code
                    </a>
                </div>
            </div>
        `
  }
}

// Scroll Progress Indicator
class ScrollProgress {
  constructor() {
    this.createProgressBar()
    this.init()
  }

  createProgressBar() {
    this.progressBar = document.createElement("div")
    this.progressBar.className = "scroll-progress"
    this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `
    document.body.appendChild(this.progressBar)
  }

  init() {
    const updateProgress = utils.throttle(() => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      this.progressBar.style.width = scrollPercent + "%"
    }, 10)

    window.addEventListener("scroll", updateProgress)
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.getElementById("back-to-top")
    this.init()
  }

  init() {
    if (!this.button) return

    const handleScroll = utils.throttle(() => {
      if (window.pageYOffset > 300) {
        this.button.classList.add("visible")
      } else {
        this.button.classList.remove("visible")
      }
    }, 100)

    window.addEventListener("scroll", handleScroll)

    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Parallax Effects
class ParallaxEffects {
  constructor() {
    this.elements = document.querySelectorAll(".floating-element")
    this.init()
  }

  init() {
    if (this.elements.length === 0) return

    const handleScroll = utils.throttle(() => {
      const scrolled = window.pageYOffset

      this.elements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || 1
        const yPos = -(scrolled * speed * 0.1)
        element.style.transform = `translateY(${yPos}px)`
      })
    }, 16)

    window.addEventListener("scroll", handleScroll)
  }
}

// Download CV Handler
class CVDownloader {
  constructor() {
    this.downloadBtn = document.getElementById("download-cv")
    this.init()
  }

  init() {
    if (!this.downloadBtn) return

    this.downloadBtn.addEventListener("click", (e) => {
      e.preventDefault()
      this.downloadCV()
    })
  }

  downloadCV() {
    // Create a mock CV download
    const cvContent = this.generateCVContent()
    const blob = new Blob([cvContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "Miracle_Chimechefulam_CV.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    // Show notification
    this.showDownloadNotification()
  }

  generateCVContent() {
    return `
Miracle Chimechefulam - FRONT-END DEVELOPER
=====================================

CONTACT INFORMATION
-------------------
Email: miraclechimechefulam27@gmail.com
Phone: +2349131710767
Location: Azikwe by No6 ojike
LinkedIn: 
GitHub: github.com/rhecthor

PROFESSIONAL SUMMARY
--------------------
Passionate front-end developer with 4+ years of experience building scalable web applications, 
and cloud solutions. Specialized in React, HTML5, CSS3, JavaScript, and modern UI/UX practices.

TECHNICAL SKILLS
----------------
Frontend: React.js, HTML5, CSS3, JavaScript, Figma
UI/UX: Figma, FlutterFlow, ADOBE XD  

EXPERIENCE
----------
Front-End Developer | Tech Innovations Inc. | 2020 - Present
- Led development of 15+ web applications serving 100K+ users
- Implemented responsive designs improving user experience by 60%
- Mentored junior developers and conducted code reviews

Front-End Developer | StartupXYZ | 2018 - 2020
- Built responsive web applications using React and modern CSS
- Integrated third-party APIs and payment systems
- Optimized application performance improving load times by 40%

EDUCATION
---------
Tech Bro Certification
IGHUB | 2018 - 2020

CERTIFICATIONS
--------------
- IGHUB Certification
- WorldBank Certification
- React Advanced Certification

PROJECTS
--------
- TradeReal E-commerce: E-commerce platform with 10K+ active users
- DATA Analytics Dashboard: Real-time analytics dashboard processing 1M+ records
- BrightFord LMS: Learning management system with 25K+ students
        `
  }

  showDownloadNotification() {
    const notification = document.createElement("div")
    notification.className = "download-notification"
    notification.innerHTML = `
            <i class="fas fa-download"></i>
            <span>CV downloaded successfully!</span>
        `
    notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10000;
            animation: slideInUp 0.3s ease;
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutDown 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 3000)
  }
}

// Preloader: Hide after 4 seconds
window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 4000)
})

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideOutDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1.2rem;
        margin-left: 0.5rem;
    }
    
    .modal-project-content {
        line-height: 1.6;
    }
    
    .project-description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        color: var(--text-secondary);
    }
    
    .project-features h4,
    .project-technologies h4,
    .project-statistics h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-size: 1.2rem;
    }
    
    .project-features ul {
        list-style: none;
        padding: 0;
    }
    
    .project-features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
        position: relative;
        padding-left: 1.5rem;
    }
    
    .project-features li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--success-color);
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .stats-grid .stat-item {
        text-align: center;
        padding: 1rem;
        background: var(--bg-color);
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
    }
    
    .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        text-transform: capitalize;
    }
    
    .project-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
`
document.head.appendChild(style)

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize loading screen
  new LoadingScreen()

  // Initialize navigation
  new Navigation()

  // Initialize typewriter effect
  const typewriterElement = document.querySelector(".typewriter")
  if (typewriterElement) {
    new TypewriterEffect(typewriterElement, CONFIG.typewriterTexts)
  }

  // Initialize animation observer
  new AnimationObserver()

  // Initialize project filter
  new ProjectFilter()

  // Initialize testimonials slider
  new TestimonialsSlider()

  // Initialize FAQ accordion
  new FAQAccordion()

  // Initialize contact form
  new ContactForm()

  // Initialize newsletter form
  new NewsletterForm()

  // Initialize chat widget
  new ChatWidget()

  // Initialize project modal
  new ProjectModal()

  // Initialize scroll progress
  new ScrollProgress()

  // Initialize back to top button
  new BackToTop()

  // Initialize parallax effects
  new ParallaxEffects()

  // Initialize CV downloader
  new CVDownloader()

  // Add loading animation to hero elements
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      ".hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats",
    )
    heroElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"

      setTimeout(() => {
        element.style.transition = "all 0.8s ease"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 200)
    })
  }, 100)
})

// Add some additional interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effects to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple effect
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(rippleStyle)
})

// Performance optimization: Lazy load images
document.addEventListener("DOMContentLoaded", () => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    const lazyImages = document.querySelectorAll("img[data-src]")
    lazyImages.forEach((img) => imageObserver.observe(img))
  }
})

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key to close modals/menus
  if (e.key === "Escape") {
    // Close mobile menu
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")
    if (hamburger && navMenu && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }

    // Close chat widget
    const chatWindow = document.getElementById("chat-window")
    if (chatWindow && chatWindow.classList.contains("active")) {
      chatWindow.classList.remove("active")
    }
  }
})

console.log("🚀 Portfolio website loaded successfully!")
console.log("✨ All interactive features are now active")
