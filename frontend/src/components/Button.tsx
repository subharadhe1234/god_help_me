
import React from 'react'

interface ButtonProps {
  title: string
}

const Button: React.FC<ButtonProps> = ({ title })  => {
  return (
    <button className='relative overflow-hidden bg-green-900 text-white font-semibold backdrop-blur-lg shadow-lg flex gap-6 px-6 py-3 rounded-full border border-white/20 shadow-green-500'>{title}</button>
  )
}

export default Button

