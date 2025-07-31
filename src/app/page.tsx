'use client'

import { useState } from 'react'
import ChatInterface from '../components/ChatInterface'
import QueryHistory from '../components/QueryHistory'
import { QueryResponse, QueryHistoryItem } from '../lib/api'

export default function HomePage() {
  const [refreshHistory, setRefreshHistory] = useState(0)
  const [selectedQuery, setSelectedQuery] = useState<QueryHistoryItem | null>(null)

  const handleQuerySubmitted = (response: QueryResponse) => {
    // Refresh history when a new query is submitted
    setRefreshHistory(prev => prev + 1)
  }

  const handleHistoryItemClick = (query: QueryHistoryItem) => {
    setSelectedQuery(query)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ask Anything About
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Travel Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get instant, accurate information about visa requirements, passport needs, 
              and travel documentation for any destination worldwide.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Instant Responses</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Accurate Information</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-700">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>AI Assistant</span>
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  Ask me anything about travel documentation requirements
                </p>
              </div>
              <ChatInterface 
                onQuerySubmitted={handleQuerySubmitted}
                selectedQuery={selectedQuery}
                onQueryCleared={() => setSelectedQuery(null)}
              />
            </div>

            {/* Example queries */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Try these example queries:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "What documents do I need to travel from Kenya to Ireland?",
                  "Visa requirements for US citizens traveling to Japan",
                  "What are the passport requirements for traveling to Dubai?",
                  "Documents needed for a business trip to Germany from Nigeria"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuery({
                      id: -1,
                      query: example,
                      response: '',
                      timestamp: new Date().toISOString(),
                      success: true
                    })}
                    className="text-left p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                        {example}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Query History Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Recent Queries</span>
                </h3>
              </div>
              <QueryHistory 
                refreshTrigger={refreshHistory}
                onItemClick={handleHistoryItemClick}
                selectedItemId={selectedQuery?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our AI Assistant?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI technology to provide you with the most accurate and up-to-date travel information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Lightning Fast",
                description: "Get instant responses to your travel documentation questions in seconds."
              },
              {
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Highly Accurate",
                description: "AI-powered responses based on the latest travel requirements and regulations."
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Always Available",
                description: "24/7 access to travel information whenever you need it, wherever you are."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}