import React from 'react'
import { splitTextByLines } from '../templates/TemplateTypes'

interface TextWithLineBreaksProps {
  text: string
  className?: string
  paragraphClassName?: string
}

export const TextWithLineBreaks: React.FC<TextWithLineBreaksProps> = ({ 
  text, 
  className = '', 
  paragraphClassName = 'mb-1' 
}) => {
  const lines = splitTextByLines(text)
  
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <p key={index} className={paragraphClassName}>
          {line}
        </p>
      ))}
    </div>
  )
}

export default TextWithLineBreaks