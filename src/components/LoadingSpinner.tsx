'use client'

import { Loader2, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars'
  color?: 'primary' | 'secondary' | 'white' | 'gray'
  text?: string
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
}

const colorClasses = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  white: 'text-white',
  gray: 'text-gray-400'
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'default',
  color = 'primary',
  text = 'Loading...',
  className,
  showText = false
}: LoadingSpinnerProps) {
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full bg-current',
                  colorClasses[color]
                )}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <motion.div
            className={cn(
              'rounded-full bg-current',
              sizeClasses[size],
              colorClasses[color]
            )}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )

      case 'bars':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'w-1 bg-current rounded-full',
                  colorClasses[color],
                  size === 'sm' ? 'h-3' : size === 'md' ? 'h-4' : size === 'lg' ? 'h-5' : 'h-6'
                )}
                animate={{
                  height: [
                    size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px',
                    size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : '12px',
                    size === 'sm' ? '12px' : size === 'md' ? '16px' : size === 'lg' ? '20px' : '24px'
                  ]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )

      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
            className={cn(colorClasses[color])}
          >
            <Loader2 className={sizeClasses[size]} />
          </motion.div>
        )
    }
  }

  return (
    <div className={cn(
      'flex flex-col items-center justify-center space-y-2',
      className
    )}>
      {renderSpinner()}
      
      {showText && text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'text-sm font-medium',
            color === 'white' ? 'text-white' : 'text-gray-600'
          )}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Specialized spinner components for common use cases
export function ChatLoadingSpinner() {
  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
      <LoadingSpinner size="sm" variant="dots" color="primary" />
      <span className="text-sm text-gray-600 font-medium">
        Thinking...
      </span>
    </div>
  )
}

export function ButtonLoadingSpinner({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return (
    <LoadingSpinner 
      size={size} 
      variant="default" 
      color="white" 
      className="inline-flex"
    />
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <LoadingSpinner 
        size="lg" 
        variant="default" 
        color="primary" 
        text="Loading content..."
        showText={true}
      />
    </div>
  )
}

export function InlineLoadingSpinner() {
  return (
    <LoadingSpinner 
      size="sm" 
      variant="dots" 
      color="primary" 
      className="inline-flex"
    />
  )
}