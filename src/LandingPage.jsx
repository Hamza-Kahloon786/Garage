// landingPage.jsx
import { useState, useEffect, useRef } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Calculator state
  const [jobValue, setJobValue] = useState(500)
  const [missedCalls, setMissedCalls] = useState(5)
  const [closeRate, setCloseRate] = useState(30)
  const [calculatedRevenue, setCalculatedRevenue] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Waitlist state
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)
  
  // Animation states
  const [visibleSections, setVisibleSections] = useState({})
  
  // Dynamic text rotation for hero phone mockup
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const dynamicTexts = [
    { 
      line1: 'MOT Due Tomorrow', 
      line2: 'Ford Focus 2019', 
      line3: 'Customer: John Smith',
      line4: '07700 900123',
      platform1: 'Brake Inspection Required',
      platform2: 'Full Service History Available',
      platform3: 'Awaiting Customer Response'
    },
    { 
      line1: 'Full Service Booked', 
      line2: 'BMW 320d 2021', 
      line3: 'Customer: Sarah Jones',
      line4: '07712 345678',
      platform1: 'Oil Change Included',
      platform2: 'Filter Replacement Due',
      platform3: 'Appointment Confirmed'
    },
    { 
      line1: 'Clutch Replacement', 
      line2: 'VW Golf 2018', 
      line3: 'Customer: Mike Brown',
      line4: '07798 765432',
      platform1: 'Parts Ordered',
      platform2: 'Estimated 4 Hours Labour',
      platform3: 'Quote Sent to Customer'
    },
    { 
      line1: 'Engine Diagnostic', 
      line2: 'Audi A4 2020', 
      line3: 'Customer: Emma Wilson',
      line4: '07654 321098',
      platform1: 'Warning Light Investigation',
      platform2: 'Scan Tool Required',
      platform3: 'Callback Requested'
    },
    { 
      line1: 'Tyre Replacement x4', 
      line2: 'Mercedes C-Class 2022', 
      line3: 'Customer: David Lee',
      line4: '07890 123456',
      platform1: 'Premium Tyres Selected',
      platform2: 'Wheel Alignment Included',
      platform3: 'Ready for Collection'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotate dynamic text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const calculateRevenue = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const monthlyMissedCalls = missedCalls * 4
      const potentialLeads = monthlyMissedCalls * (closeRate / 100)
      const lostRevenue = potentialLeads * jobValue
      setCalculatedRevenue(Math.round(lostRevenue))
      setIsCalculating(false)
    }, 800)
  }

  const handleWaitlistSubmit = (e) => {
    e.preventDefault()
    if (waitlistEmail) {
      setWaitlistSubmitted(true)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F0] to-[#FAFAFA] overflow-x-hidden">
      
      {/* ========== NAVBAR - UPDATED WITH BORDERED BUTTONS ========== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#E5E7EB]' 
          : 'bg-white border-b border-[#E5E7EB]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] flex items-center justify-center shadow-lg shadow-[#C9A962]/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#1A1A1A]">Garage<span className="text-[#C9A962]">AI</span></span>
            </div>

            {/* Desktop Menu - ALL BUTTONS WITH BORDERS */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('calculator')} 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                Calculator
              </button>
              <button 
                onClick={() => scrollToSection('demo')} 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                Contact
              </button>
              <a 
                href="/admin" 
                className="px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962] hover:bg-[#C9A962]/5 transition-all duration-300"
              >
                Admin
              </a>
            </div>

            {/* CTA Button - Larger */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('demo')}
                className="px-8 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Demo
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-[#E5E7EB] px-4 py-6 space-y-3">
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">How It Works</button>
            <button onClick={() => scrollToSection('calculator')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Calculator</button>
            <button onClick={() => scrollToSection('demo')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Demo</button>
            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Pricing</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Contact</button>
            <a href="/admin" className="block w-full text-left px-4 py-2 text-[#4A4A4A] font-medium border-2 border-[#E5E7EB] rounded-full hover:border-[#C9A962] hover:text-[#C9A962]">Admin</a>
            <button onClick={() => scrollToSection('demo')} className="w-full px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full mt-4">Book Demo</button>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION - WITH ANIMATED PHONE & DYNAMIC TEXT ========== */}
      <section className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 bg-[#FAFAFA] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div 
              id="hero-content" 
              data-animate
              className={`transition-all duration-1000 ${visibleSections['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A962]/10 rounded-full mb-4 border border-[#C9A962]/20">
                <span className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-[#C9A962]">UK's #1 Missed Call Recovery System</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4">
                Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F]">Missed Calls</span> Into Leads
              </h1>
              
              <p className="text-xl text-[#4A4A4A] mb-4 leading-relaxed">
                GarageAI turns every missed call into a potential paying customer.
              </p>
              
              <div className="text-[#6B7280] mb-6 space-y-2">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  We instantly send one polite SMS
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Guide the customer to a simple form
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Deliver a clean, ready-to-book lead to your inbox
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="group px-8 py-4 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-xl shadow-[#C9A962]/30 hover:shadow-2xl hover:shadow-[#C9A962]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book 15-min Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-full border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:text-[#C9A962] transition-all duration-300"
                >
                  See How It Works
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  £49/month
                </span>
                <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
                <span>Cancel anytime</span>
                <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
                <span>Works with your current number</span>
                <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
                <span>GDPR compliant</span>
              </div>
            </div>

            {/* Right Side - FLOATING Phone Mockup with Podium & DYNAMIC TEXT */}
            <div 
              id="hero-visual"
              data-animate
              className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${visibleSections['hero-visual'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="relative">
                {/* Phone Mockup - FLOATING ANIMATION */}
                <div className="relative z-10 w-64 sm:w-72 mx-auto animate-phoneFloat">
                  {/* Phone Frame */}
                  <div className="bg-[#1A1A1A] rounded-[2.5rem] p-3 shadow-2xl shadow-black/20">
                    {/* Phone Screen */}
                    <div className="bg-white rounded-[2rem] overflow-hidden">
                      <div className="p-5">
                        {/* App Header */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-bold text-[#1A1A1A]">GarageAI</p>
                            <p className="text-sm text-[#C9A962] font-medium">New Lead</p>
                          </div>
                        </div>
                        
                        {/* DYNAMIC Content Line 1 */}
                        <div className="space-y-3 mb-5">
                          <div className="h-5 bg-gradient-to-r from-[#C9A962]/20 to-[#C9A962]/5 rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center px-3">
                              <span 
                                key={`phone-line1-${currentTextIndex}`}
                                className="text-xs font-semibold text-[#C9A962] animate-textFade"
                              >
                                {dynamicTexts[currentTextIndex].line1}
                              </span>
                            </div>
                          </div>
                          {/* DYNAMIC Content Line 2 */}
                          <div className="h-4 bg-[#F3F4F6] rounded-full w-4/5 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center px-3">
                              <span 
                                key={`phone-line2-${currentTextIndex}`}
                                className="text-[10px] font-medium text-[#6B7280] animate-textFade"
                              >
                                {dynamicTexts[currentTextIndex].line2}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Registration Plate - STATIC */}
                        <div className="bg-gradient-to-r from-[#C9A962]/20 to-[#E8D5A3]/20 rounded-xl py-4 px-6 mb-5 border border-[#C9A962]/30">
                          <p className="text-center text-xl font-bold text-[#C9A962] tracking-wider">AB12 CDE</p>
                        </div>
                        
                        {/* DYNAMIC Content Line 3 & 4 */}
                        <div className="space-y-3">
                          <div className="h-4 bg-[#F3F4F6] rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center px-3">
                              <span 
                                key={`phone-line3-${currentTextIndex}`}
                                className="text-[10px] font-medium text-[#6B7280] animate-textFade"
                              >
                                {dynamicTexts[currentTextIndex].line3}
                              </span>
                            </div>
                          </div>
                          <div className="h-4 bg-[#F9FAFB] rounded-full w-3/5 overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center px-3">
                              <span 
                                key={`phone-line4-${currentTextIndex}`}
                                className="text-[10px] font-medium text-[#9CA3AF] animate-textFade"
                              >
                                {dynamicTexts[currentTextIndex].line4}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Podium/Platform - STATIC (doesn't float) */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
                  {/* Top Platform with DYNAMIC text */}
                  <div className="w-48 h-6 bg-gradient-to-b from-[#F5F5F0] to-[#E8E8E3] rounded-full shadow-lg relative z-20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        key={`platform1-${currentTextIndex}`}
                        className="text-[8px] font-medium text-[#C9A962]/60 animate-textFade"
                      >
                        {dynamicTexts[currentTextIndex].platform1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Middle Platform with DYNAMIC text */}
                  <div className="w-56 h-5 bg-gradient-to-b from-[#FAFAFA] to-[#EFEFEA] rounded-full shadow-md -mt-1 relative z-10 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        key={`platform2-${currentTextIndex}`}
                        className="text-[8px] font-medium text-[#9CA3AF]/60 animate-textFade"
                      >
                        {dynamicTexts[currentTextIndex].platform2}
                      </span>
                    </div>
                  </div>
                  
                  {/* Bottom Platform with DYNAMIC text */}
                  <div className="w-64 h-5 bg-gradient-to-b from-[#F8F8F3] to-[#E5E5E0] rounded-full shadow -mt-1 relative z-0 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        key={`platform3-${currentTextIndex}`}
                        className="text-[8px] font-medium text-[#D1D5DB]/80 animate-textFade"
                      >
                        {dynamicTexts[currentTextIndex].platform3}
                      </span>
                    </div>
                  </div>
                  
                  {/* Shadow */}
                  <div className="w-52 h-3 bg-gradient-to-b from-[#E0E0DB]/40 to-transparent rounded-full blur-sm mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS BAR - WITH BORDER AND TRANSITIONS ========== */}
      <div className="flex justify-center pt-8">
  <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
    Growth Insights
  </span>
</div>
      <section className="py-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="stats"
            data-animate
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-all duration-1000 delay-500 ${visibleSections['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {[
              { value: '95%', label: 'Detection Accuracy' },
              { value: '<3s', label: 'SMS Response Time' },
              { value: '47%', label: 'Lead Conversion Rate' },
              { value: '24/7', label: 'Automatic Operation' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-5 text-center border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-sm hover:shadow-xl hover:shadow-[#C9A962]/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <p className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F] group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                <p className="text-sm text-[#6B7280] mt-1 group-hover:text-[#4A4A4A] transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CALCULATOR SECTION - WITH BORDER AND TRANSITIONS ========== */}
      <section id="calculator" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="calc-header"
            data-animate
            className={`text-center mb-8 transition-all duration-1000 ${visibleSections['calc-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
              Revenue Calculator
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1A1A1A] mb-4">
              Revenue Missed Calculator
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Quick 30-second calculator: See how many potential jobs you're losing every month (UK garage averages).
            </p>
          </div>
          <div 
            id="calc-form"
            data-animate
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${visibleSections['calc-form'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border-2 border-[#E5E7EB] hover:border-[#C9A962]/50 hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Job Value */}
                <div className="group">
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Average Job Value (£)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A962] font-semibold">£</span>
                    <input
                      type="number"
                      value={jobValue}
                      onChange={(e) => setJobValue(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Missed Calls */}
                <div className="group">
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Missed Calls Per Week</label>
                  <input
                    type="number"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full px-4 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
                  />
                </div>

                {/* Close Rate */}
                <div className="group">
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Close Rate (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={closeRate}
                      onChange={(e) => setCloseRate(Number(e.target.value))}
                      className="w-full pl-4 pr-10 py-4 bg-[#FAFAFA] border-2 border-[#E5E7EB] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A962] font-semibold">%</span>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateRevenue}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Calculate Lost Revenue'
                )}
              </button>

              {/* Result */}
              {calculatedRevenue !== null && (
                <div className="mt-8 p-6 bg-gradient-to-r from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-2xl border-2 border-[#C9A962]/30 text-center animate-fadeIn">
                  <p className="text-sm text-[#6B7280] mb-2">Estimated Monthly Revenue Lost</p>
                  <p className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] to-[#B8963F]">
                    £{calculatedRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#6B7280] mt-4">
                    That's <span className="font-semibold text-[#C9A962]">£{(calculatedRevenue * 12).toLocaleString()}</span> per year you could be recovering
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION - ONLY REDUCED PADDING ========== */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F0] to-[#FAFAFA] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A962]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C9A962]/3 to-transparent rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div 
            id="hiw-header"
            data-animate
            className={`text-center mb-12 transition-all duration-1000 ${visibleSections['hiw-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-full mb-6 border border-[#C9A962]/20 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#C9A962] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-[#C9A962] tracking-wide">Simple 3-Step Process</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-[#1A1A1A] mb-6">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#D4AF37] to-[#C9A962]">Works</span>
            </h2>
            <p className="text-lg lg:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Three simple steps to transform missed calls into paying customers
            </p>
          </div>

          {/* Steps Container */}
          <div 
            id="hiw-steps"
            data-animate
            className={`relative transition-all duration-1000 delay-200 ${visibleSections['hiw-steps'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962]/20 to-transparent -translate-y-1/2 z-0"></div>
            <div className="hidden lg:block absolute top-1/2 left-[16.5%] right-[16.5%] z-0 -translate-y-1/2">
              <div className="h-0.5 bg-gradient-to-r from-[#C9A962]/40 via-[#C9A962] to-[#C9A962]/40 relative">
                {/* Animated Dot */}
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#C9A962] rounded-full shadow-lg shadow-[#C9A962]/50 animate-moveDot"></div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="group relative">
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
                  {/* Step Number - Floating Badge */}
                  <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <span className="text-xl font-bold text-white">01</span>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:rotate-6 transition-all duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                      <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step One</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
                      Call Missed
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
                      You're busy working on a vehicle — the customer's call goes unanswered. GarageAI instantly detects this missed opportunity.
                    </p>
                    
                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
                        Instant Detection
                      </span>
                      <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
                        24/7 Monitoring
                      </span>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Mobile Arrow */}
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative lg:mt-8">
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
                  {/* Step Number - Floating Badge */}
                  <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <span className="text-xl font-bold text-white">02</span>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-inner">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:-rotate-6 transition-all duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                      <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step Two</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
                      Smart SMS Sent
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
                      Within seconds, a friendly automated message is sent to the caller with a link to your custom booking form.
                    </p>
                    
                    {/* SMS Preview */}
                    <div className="bg-gradient-to-br from-[#F8F9FA] to-[#F3F4F6] rounded-xl p-3 border border-[#E5E7EB] group-hover:border-[#C9A962]/30 transition-all duration-300">
                      <p className="text-xs text-[#4A4A4A] italic">
                        "Sorry we missed your call! Tap here to book your service: <span className="text-[#C9A962] font-medium">link</span>"
                      </p>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Mobile Arrow */}
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative">
                {/* Card */}
                <div className="relative bg-white rounded-3xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] shadow-lg hover:shadow-2xl hover:shadow-[#C9A962]/20 transition-all duration-500 overflow-hidden">
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/0 via-[#C9A962]/0 to-[#C9A962]/0 group-hover:from-[#C9A962]/5 group-hover:via-transparent group-hover:to-[#E8D5A3]/5 transition-all duration-500"></div>
                  
                  {/* Step Number - Floating Badge */}
                  <div className="absolute -top-0 -right-0 w-20 h-20 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-bl-[2.5rem] flex items-start justify-end p-3 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <span className="text-xl font-bold text-white">03</span>
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FDF8F0] to-[#F5EFE0] rounded-2xl flex items-center justify-center border border-[#C9A962]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30 group-hover:shadow-xl group-hover:shadow-[#C9A962]/40 transition-all duration-500">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    {/* Decorative Ring */}
                    <div className="absolute -inset-2 border-2 border-dashed border-[#C9A962]/20 rounded-3xl group-hover:border-[#C9A962]/40 group-hover:rotate-6 transition-all duration-500"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A962] to-transparent"></div>
                      <span className="text-xs font-bold text-[#C9A962] uppercase tracking-wider">Step Three</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#C9A962] transition-colors duration-300">
                      Lead Delivered
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-sm">
                      Customer fills the form with their details and vehicle registration. You receive a complete, ready-to-action lead in your inbox.
                    </p>
                    
                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
                        Full Details
                      </span>
                      <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
                        Vehicle Reg
                      </span>
                      <span className="px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] border border-[#C9A962]/20">
                        Direct Email
                      </span>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Success Glow Effect */}
                  <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#C9A962]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 bg-white rounded-full shadow-lg border border-[#E5E7EB]">
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] border-2 border-white flex items-center justify-center text-white text-xs font-bold">J</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B8963F] to-[#C9A962] border-2 border-white flex items-center justify-center text-white text-xs font-bold">M</div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8D5A3] border-2 border-white flex items-center justify-center text-white text-xs font-bold">S</div>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    <span className="font-semibold text-[#1A1A1A]">500+</span> UK garages trust GarageAI
                  </p>
                </div>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="px-6 py-2 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                >
                  See It In Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== DEMO BOOKING SECTION - WITH CALENDAR ADDED ========== */}
      <section id="demo" className="py-12 lg:py-16 bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="demo-content"
            data-animate
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections['demo-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
              See It In Action
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
              Book Your 15-Min Demo
            </h2>
            <p className="text-lg text-[#6B7280] mb-6 max-w-xl mx-auto">
              See exactly how GarageAI captures missed call leads in real time. Takes just 15 minutes – no obligation. Powered by Zoom.
            </p>
            
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962]/50 hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column - Demo Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    {[
                      'Live demonstration of the missed call flow',
                      'See real leads captured in real-time',
                      'Q&A with our team',
                      'Custom pricing discussion'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-5 h-5 bg-[#C9A962]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A962]/20 transition-colors duration-300 border border-[#C9A962]/20">
                          <svg className="w-3 h-3 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-[#4A4A4A] text-sm group-hover:text-[#1A1A1A] transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href="https://calendly.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-xl shadow-[#C9A962]/30 hover:shadow-2xl hover:shadow-[#C9A962]/40 hover:-translate-y-1 transition-all duration-300 mt-4"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Demo Now
                  </a>
                </div>
                
                {/* Right Column - Calendar */}
                <div className="border border-[#E5E7EB] rounded-xl p-4">
                  <div className="text-left mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">30 Minute Meeting</h3>
                    <div className="flex items-center gap-2 text-[#6B7280] text-sm">
                      <span>30 min</span>
                      <span>•</span>
                      <span>Web conferencing details provided upon confirmation.</span>
                    </div>
                  </div>
                  
                  <h4 className="text-md font-semibold text-[#1A1A1A] mb-3">Select a Date & Time</h4>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-[#4A4A4A] mb-2">February 2026</h5>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-[#6B7280] py-1">
                          {day}
                        </div>
                      ))}
                      
                      {/* Empty days before Feb 1 (Feb 1, 2026 is a Sunday) */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`empty-${i}`} className="text-center py-1"></div>
                      ))}
                      
                      {/* February days */}
                      <div className="text-center py-1 text-sm text-[#4A4A4A]">1</div>
                      
                      {/* Week 1 */}
                      {[2, 3, 4, 5, 6, 7, 8].map((day) => (
                        <div key={day} className="text-center py-1">
                          <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
                            {day}
                          </button>
                        </div>
                      ))}
                      
                      {/* Week 2 */}
                      {[9, 10, 11, 12, 13, 14, 15].map((day) => (
                        <div key={day} className="text-center py-1">
                          <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
                            {day}
                          </button>
                        </div>
                      ))}
                      
                      {/* Week 3 */}
                      {[16, 17, 18, 19, 20, 21, 22].map((day) => (
                        <div key={day} className="text-center py-1">
                          <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
                            {day}
                          </button>
                        </div>
                      ))}
                      
                      {/* Week 4 */}
                      {[23, 24, 25, 26, 27, 28].map((day) => (
                        <div key={day} className="text-center py-1">
                          <button className="w-8 h-8 rounded-full text-[#4A4A4A] text-sm hover:bg-[#C9A962]/10 hover:text-[#C9A962] transition-colors duration-300">
                            {day}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Time Zone */}
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <span>🇵🇰</span>
                      <span>Pakistan, Maldives Time (9:52pm)</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-[#9CA3AF]">
                    <span>Cookie settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EARLY ACCESS WAITLIST - COMPACT VERSION ========== */}
      <section id="waitlist" className="py-10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="waitlist-content"
            data-animate
            className={`max-w-4xl mx-auto transition-all duration-1000 ${visibleSections['waitlist-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="bg-gradient-to-r from-[#C9A962]/5 to-[#E8D5A3]/5 rounded-2xl p-6 lg:p-8 border-2 border-[#C9A962]/20 hover:border-[#C9A962]/40 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                <div className="flex-1 text-center lg:text-left">
                  <span className="inline-block px-3 py-1 bg-[#C9A962]/10 rounded-full text-xs font-medium text-[#C9A962] mb-2 border border-[#C9A962]/20">
                    Coming Soon
                  </span>
                  <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A] mb-1">
                    Join the Early Access Waitlist
                  </h2>
                  <p className="text-[#6B7280] text-sm">
                    Be first in line when we launch in February 2026.
                  </p>
                </div>
                
                <div className="flex-1 w-full lg:w-auto">
                  {waitlistSubmitted ? (
                    <div className="flex items-center justify-center gap-3 py-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A962]/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#1A1A1A] font-medium text-sm">You're on the list!</span>
                    </div>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-4 py-2.5 bg-white border-2 border-[#E5E7EB] rounded-full text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#C9A962] hover:border-[#C9A962]/50 transition-all duration-300"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-full shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap text-sm"
                      >
                        Join Waitlist
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRICING SECTION - WITH BORDER AND TRANSITIONS ========== */}
      <section id="pricing" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="pricing-content"
            data-animate
            className={`max-w-3xl mx-auto transition-all duration-1000 ${visibleSections['pricing-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
                Simple Pricing
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
                One Plan. Everything Included.
              </h2>
              <p className="text-lg text-[#6B7280]">
                No hidden fees. No contracts. Cancel anytime.
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-xl p-6 lg:p-8 border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:shadow-2xl hover:shadow-[#C9A962]/10 transition-all duration-500 relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white text-xs font-semibold rounded-full shadow-lg shadow-[#C9A962]/30">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-4">
                <p className="text-[#6B7280] text-sm mb-1">Monthly subscription</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-[#1A1A1A] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#C9A962] group-hover:to-[#B8963F] transition-all duration-300">£49</span>
                  <span className="text-lg text-[#6B7280]">/month</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {[
                  'Unlimited missed call detection',
                  'Automatic SMS responses',
                  'Custom lead capture forms',
                  'Email lead notifications',
                  'UK vehicle registration validation',
                  'Works with your existing number',
                  'GDPR compliant',
                  '24/7 automatic operation',
                  'Pause or cancel anytime',
                  'No setup fees'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group/item">
                    <div className="w-4 h-4 bg-[#C9A962]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#C9A962]/20 transition-colors duration-300 border border-[#C9A962]/20">
                      <svg className="w-2 h-2 text-[#C9A962]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#4A4A4A] text-sm group-hover/item:text-[#1A1A1A] transition-colors duration-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => scrollToSection('demo')}
                className="w-full py-3 bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] text-white font-semibold rounded-xl shadow-lg shadow-[#C9A962]/30 hover:shadow-xl hover:shadow-[#C9A962]/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Your Free Trial
              </button>
              
              <p className="text-center text-xs text-[#9CA3AF] mt-3">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION - SIMPLIFIED ========== */}
      <section id="contact" className="py-12 lg:py-16 bg-gradient-to-b from-[#F5F5F0] to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="contact-content"
            data-animate
            className={`max-w-3xl mx-auto transition-all duration-1000 ${visibleSections['contact-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-[#C9A962]/10 rounded-full text-sm font-medium text-[#C9A962] mb-4 border border-[#C9A962]/20">
                Get In Touch
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
                Contact
              </h2>
              <p className="text-lg text-[#6B7280] max-w-xl mx-auto">
                Have questions? We're here to help you transform missed calls into revenue.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { 
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 
                  title: 'Email Us', 
                  value: 'daniel@garageai.co.uk', 
                  href: 'mailto:hello@garageai.co.uk' 
                },
                { 
                  icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', 
                  title: 'Call Us', 
                  value: '0779 254 6820', 
                  href: 'tel:08001234567' 
                },
                { 
                  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', 
                  title: 'Location', 
                  value: 'United Kingdom', 
                  href: null 
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border-2 border-[#E5E7EB] hover:border-[#C9A962] hover:shadow-lg hover:shadow-[#C9A962]/10 transition-all duration-300 text-center group">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C9A962]/10 to-[#E8D5A3]/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-gradient-to-br group-hover:from-[#C9A962]/20 group-hover:to-[#E8D5A3]/20 transition-all duration-300">
                    <svg className="w-5 h-5 text-[#C9A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[#1A1A1A] font-medium text-sm hover:text-[#C9A962] transition-colors duration-300">{item.value}</a>
                  ) : (
                    <p className="text-[#1A1A1A] font-medium text-sm">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER - IMPROVED ========== */}
      <footer className="bg-[#1A1A1A] border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C9A962] to-[#E8D5A3] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-base font-bold text-white">Garage<span className="text-[#C9A962]">AI</span></span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-[#9CA3AF] text-center">
              © 2026 GarageAI • Next-Gen Missed Call Lead Recovery for UK Garages
            </p>

            {/* Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Privacy</a>
              <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Terms</a>
              <a href="#" className="text-xs text-[#9CA3AF] hover:text-[#C9A962] transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes textFade {
          0% { opacity: 0; transform: translateY(5px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes moveDot {
          0% { left: 0%; }
          50% { left: calc(100% - 12px); }
          100% { left: 0%; }
        }
        .animate-phoneFloat {
          animation: phoneFloat 4s ease-in-out infinite;
        }
        .animate-textFade {
          animation: textFade 3s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-moveDot {
          animation: moveDot 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}