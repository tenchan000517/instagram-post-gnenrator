import React from 'react'

interface ViewportProps {
  width: number
  height: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Viewport({ 
  width, 
  height, 
  children, 
  className = '',
  style = {} 
}: ViewportProps) {
  return (
    <div 
      className={`bg-gray-50 rounded-lg overflow-hidden ${className}`}
      style={{ 
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
    >
      {children}
    </div>
  )
}