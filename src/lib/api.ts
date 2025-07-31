import axios from 'axios'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message)
    
    if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.detail || 'Invalid request')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.')
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.')
    }
    
    throw new Error(error.response?.data?.detail || 'An unexpected error occurred')
  }
)

// Type definitions
export interface QueryRequest {
  query: string
  user_id?: string
}

export interface QueryResponse {
  id?: number
  query: string
  response: string
  timestamp: string
  response_time?: number
  success: boolean
}

export interface QueryHistoryItem {
  id: number
  query: string
  response: string
  timestamp: string
  response_time?: number
  success: boolean
}

export interface QueryHistoryResponse {
  queries: QueryHistoryItem[]
  total_count: number
  page: number
  page_size: number
}

export interface ApiError {
  error: string
  message: string
  detail?: string
}

export interface SystemStats {
  total_queries: number
  system_status: string
  api_version: string
  timestamp: string
}

// API Functions

/**
 * Submit a query to the AI system
 */
export async function submitQuery(query: string, userId?: string): Promise<QueryResponse> {
  try {
    const requestData: QueryRequest = {
      query: query.trim(),
      ...(userId && { user_id: userId })
    }

    const response = await apiClient.post<QueryResponse>('/api/chat/query', requestData)
    return response.data
  } catch (error) {
    console.error('Failed to submit query:', error)
    throw error
  }
}

/**
 * Get query history with pagination
 */
export async function getQueryHistory(
  page: number = 1, 
  pageSize: number = 10, 
  userId?: string
): Promise<QueryHistoryResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
      ...(userId && { user_id: userId })
    })

    const response = await apiClient.get<QueryHistoryResponse>(
      `/api/chat/history?${params.toString()}`
    )
    return response.data
  } catch (error) {
    console.error('Failed to fetch query history:', error)
    throw error
  }
}

/**
 * Get system statistics
 */
export async function getSystemStats(): Promise<SystemStats> {
  try {
    const response = await apiClient.get<SystemStats>('/api/chat/stats')
    return response.data
  } catch (error) {
    console.error('Failed to fetch system stats:', error)
    throw error
  }
}

/**
 * Delete a query from history
 */
export async function deleteQuery(queryId: number): Promise<{ message: string; success: boolean }> {
  try {
    const response = await apiClient.delete(`/api/chat/history/${queryId}`)
    return response.data
  } catch (error) {
    console.error('Failed to delete query:', error)
    throw error
  }
}

/**
 * Check API health
 */
export async function checkApiHealth(): Promise<{ status: string; message: string }> {
  try {
    const response = await apiClient.get('/health')
    return response.data
  } catch (error) {
    console.error('Failed to check API health:', error)
    throw error
  }
}

/**
 * Check chat service health
 */
export async function checkChatHealth(): Promise<{
  service: string
  status: string
  timestamp: string
  dependencies: Record<string, string>
}> {
  try {
    const response = await apiClient.get('/api/chat/health')
    return response.data
  } catch (error) {
    console.error('Failed to check chat service health:', error)
    throw error
  }
}

// Utility functions

/**
 * Format error message for display
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    return apiError.message || apiError.detail || 'An unexpected error occurred'
  }
  
  return 'An unexpected error occurred'
}

/**
 * Validate query input
 */
export function validateQuery(query: string): { isValid: boolean; error?: string } {
  const trimmedQuery = query.trim()
  
  if (!trimmedQuery) {
    return { isValid: false, error: 'Query cannot be empty' }
  }
  
  if (trimmedQuery.length > 1000) {
    return { isValid: false, error: 'Query is too long (max 1000 characters)' }
  }
  
  if (trimmedQuery.length < 3) {
    return { isValid: false, error: 'Query is too short (min 3 characters)' }
  }
  
  return { isValid: true }
}

/**
 * Generate user ID for session tracking (optional)
 */
export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get or create user ID from localStorage (if available)
 */
export function getCurrentUserId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  
  try {
    let userId = localStorage.getItem('qa_system_user_id')
    if (!userId) {
      userId = generateUserId()
      localStorage.setItem('qa_system_user_id', userId)
    }
    return userId
  } catch (error) {
    console.warn('localStorage not available, using session-only user tracking')
    return undefined
  }
}

// Export default api client for custom requests
export default apiClient