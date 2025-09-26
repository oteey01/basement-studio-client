// import React from 'react'

const Input = ({ className,placeholder, ...props}) => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-gray-500/80 capitalize text-sm'>{placeholder}</p>
        <input
        className={`rounded-md border p-2 border-gray-400/30 dark:border-gray-100 ${className}`}
        placeholder={placeholder}
        {...props}
        />
    </div>
  )
}

export default Input