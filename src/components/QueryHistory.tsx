'use client'

import { useState, useEffect } from 'react'
import { Clock, MessageSquare, Search, ChevronDown, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { getQueryHistory, QueryHistoryItem } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'

interface QueryHistoryProps {
  refreshTrigger: number
  onItemClick: (query: QueryHistoryItem) => void
  selectedItemId?: number | null
}

export default function QueryHistory({ refreshTrigger, onItemClick, selectedItemId }: QueryHistoryProps) {
  const [queries, setQueries] = useState<QueryHistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const pageSize = 5

  const fetchHistory = async (page: number = 1, refresh: boolean = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }
      setError(null)
      
      const response = await getQueryHistory(page, pageSize)
      setQueries(response.queries)
      setTotalCount(response.total_count)
      setCurrentPage(response.page)
      
    } catch (error) {
      console.error('Failed to fetch query history:', error)
      setError('Failed to load query history')
      toast.error('Failed to load query history')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [refreshTrigger])

  const handleRefresh = () => {
    fetchHistory(1, true)
  }

  const handlePageChange = (newPage: number) => {
    fetchHistory(newPage)
  }

  const filteredQueries = queries.filter(query =>
    query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.response.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const truncateText = (text: string, maxLength: number = 80) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  if (isLoading && !isRefreshing) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-500 mb-4">
          <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => fetchHistory()}
          className="btn-secondary text-sm"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="h-[600px] flex flex-col">
      {/* Header with search and refresh */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            {totalCount} {totalCount === 1 ? 'query' : 'queries'}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      {/* Query List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredQueries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 text-center"
            >
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm text-gray-500 mb-2">
                {searchTerm ? 'No matching queries found' : 'No queries yet'}
              </p>
              <p className="text-xs text-gray-400">
                {searchTerm 
                  ? 'Try a different search term' 
                  : 'Start a conversation to see your query history here'
                }
              </p>
            </motion.div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredQueries.map((query, index) => (
                <motion.div
                  key={query.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => onItemClick(query)}
                  className={`cursor-pointer rounded-lg border transition-all duration-200 hover:shadow-md p-3 ${
                    selectedItemId === query.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">
                        {truncateText(query.query, 60)}
                      </p>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 mt-1 ${
                        query.success ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {truncateText(query.response, 80)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(new Date(query.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      {query.response_time && (
                        <span>{query.response_time.toFixed(2)}s</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                const pageNumber = currentPage <= 3 
                  ? index + 1 
                  : currentPage + index - 2
                
                if (pageNumber > totalPages) return null
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-8 h-8 text-xs rounded-full transition-all duration-200 ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
          
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages} ({totalCount} total)
            </span>
          </div>
        </div>
      )}
    </div>
  )
}