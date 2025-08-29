'use client'
import Link from 'next/link'
import Image from 'next/image'

import React, { useState } from 'react'
import {
  Users,
  Target,
  Eye,
  Flag,
  Shield,
  Star,
  Heart,
  Handshake,
  Lightbulb,
  UserCheck,
} from 'lucide-react'

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContent>('purpose')

  const values = [
    {
      title: 'Integrity',
      description:
        'We uphold the highest standards of integrity and ethics in all our interactions with our clients and team members. We are transparent, honest, and accountable in all our actions, and we always act in the best interest of our clients.',
      icon: Shield,
    },
    {
      title: 'Excellence',
      description:
        'We strive to deliver the highest level of excellence in everything we do, from the quality of our resume designs to the level of customer service we provide. We are committed to continuous improvement and are never satisfied with mediocrity.',
      icon: Star,
    },
    {
      title: 'Client-centric',
      description:
        'Our clients are at the center of everything we do. We listen to their needs, understand their unique situations, and provide personalized solutions that meet their goals and exceed their expectations.',
      icon: Heart,
    },
    {
      title: 'Collaboration',
      description:
        'We believe in the power of collaboration and teamwork. We work closely with our clients to understand their goals, and we collaborate with each other to bring the best of our expertise to every project.',
      icon: Handshake,
    },
    {
      title: 'Innovation',
      description:
        'We are constantly exploring new ideas, technologies, and methods to improve our services and stay ahead of the curve. We embrace change and adapt quickly to the evolving needs of our clients and the job market.',
      icon: Lightbulb,
    },
    {
      title: 'Respect',
      description:
        'We treat everyone with respect, regardless of their background, culture, or position. We value diversity and inclusivity and strive to create a welcoming and supportive environment for our clients and team members alike.',
      icon: UserCheck,
    },
  ]

  const tabContent = {
    purpose: {
      title: 'Purpose',
      content:
        'At prosumely, our purpose to provide our clients with exceptional and customized resume design services that effectively showcase their skills, experience, and achievements, and increase their chances of securing their dream job. We are dedicated to delivering top-notch quality, innovation, and professionalism in every aspect of our service, while ensuring a personalized and collaborative approach that meets the unique needs and preferences of each client. Our ultimate goal is to empower job seekers to stand out from the competition and achieve their career aspirations.',
      icon: Target,
    },
    vision: {
      title: 'Vision',
      content:
        'Our vision as a CV/resume developing company is to be the leading provider of innovative and effective resume design solutions that transform the job search experience for our clients. We strive to continuously improve our services by leveraging the latest technologies, trends, and industry insights, while maintaining a strong focus on client satisfaction and personalized support. We envision a world where job seekers can confidently present themselves to potential employers through their professionally crafted and visually appealing resumes, and where our company is recognized as a trusted and respected partner in their career success.',
      icon: Eye,
    },
    mission: {
      title: 'Mission',
      content:
        'At Prosumely, our mission is to empower job seekers to achieve their career goals by providing them with high-quality and customized resume design services that effectively communicate their value proposition to potential employers. We are committed to delivering exceptional customer service and fostering collaborative relationships with our clients, while maintaining the highest standards of professionalism, innovation, and creativity. Our mission is to create a positive impact on the job market by helping our clients stand out from the competition and secure their desired positions, ultimately contributing to their personal and professional growth.',
      icon: Flag,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-5 rounded-full blur-3xl transform translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
              About Prosumely
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">
              Crafting Careers,
              <br />
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                One Resume at a Time
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing careers through professional resume design and cutting-edge ATS
              optimization
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center text-blue-600 text-sm font-medium mb-4">
                <Users className="w-4 h-4 mr-2" />
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Market Leaders in Professional Resume Design
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Prosumely is a market leader when it comes to Designing and developing
                  Professional Resume and CV's including Cover letters. Our professionals hold
                  expertise in Automatic tracking system (ATS) CV's, Visual CV's, Executive CV's,
                  and various other related customized works.
                </p>
                <p>
                  In the last 10+ years, our efforts have developed into monumental results and our
                  idea to set out a revolutionary change and set the standardized benchmark in
                  Recruiting Industry. We at Prosumely intend to develop the world's number one Job
                  Oriented organization and revolutionize the field with our introduction of
                  game-changing technologies in this field.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl font-bold text-blue-600">10+</div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-gray-600 mb-4">Years of Excellence</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl p-6 text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">#1</div>
                    <div className="text-blue-100 text-sm">Market Leader</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose, Vision, Mission - Creative Tab Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Our foundation is built on three core pillars that guide every decision we make
            </p>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-gray-100">
              {Object.entries(tabContent).map(([key, tab]) => {
                const IconComponent = tab.icon
                const tabKey = key as keyof typeof tabContent
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(tabKey)}
                    className={`flex-1 px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-left transition-all duration-300 relative group ${
                      activeTab === tabKey
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeTab === tabKey
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm sm:text-base truncate">{tab.title}</div>
                        <div className="text-xs sm:text-sm opacity-70 hidden sm:block">Our {key}</div>
                      </div>
                    </div>
                    {activeTab === tabKey && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="transition-all duration-500 ease-in-out">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    {React.createElement(tabContent[activeTab].icon, {
                      className: 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white',
                    })}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {tabContent[activeTab].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-none">
                      {tabContent[activeTab].content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Advisor Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Advisor
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our advisory team brings decades of experience in career development and
                professional growth.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src="/Malcolm Garrington Advisor.jpeg"
                    alt="Malcolm Garrington - Career Strategy Advisor"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Malcolm Garrington
                    </h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">
                      Career Strategy Advisor
                    </p>
                  </div>

                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Malcolm Garrington is a trusted authority in personal branding, career
                      strategy, and professional growth. With 40+ years of experience in coaching
                      leaders, entrepreneurs, and ambitious professionals, he has helped countless
                      individuals unlock their potential and position themselves for success.
                    </p>
                    <p>
                      As an advisor to Prosumely, Malcolm brings deep expertise in career
                      development and branding, guiding our mission to empower people in building
                      impactful careers and standing out in an ever-changing professional landscape.
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-700 leading-tight">
                      <div className="font-semibold text-gray-900 mb-1">Contact:</div>
                      <div className="space-y-0.5">
                        <div><strong>Email:</strong> malgarrington@hotmail.com</div>
                        <div><strong>Mobile:</strong> Egypt: +20 122 69 555 00 | Indonesia: +62 812 705 3859 | UAE: +971 58 564 8899</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      40+ Years Experience
                    </span>
                    <span className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium">
                      Personal Branding Expert
                    </span>
                    <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                      Career Strategy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of professionals who have successfully landed their dream jobs with our
            expertly crafted resumes.
          </p>
          <Link href="/services" className="inline-block">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
