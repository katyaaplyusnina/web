import React from 'react'

const Checkbox = React.forwardRef(({ id, label, ...props }, ref) => {
  return (
    <label htmlFor={id} className="checkbox-container">
      <input 
        type="checkbox" 
        id={id} 
        className="checkbox-input"
        ref={ref}
        {...props}
      />
      <span className="checkbox-custom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
      {label}
    </label>
  )
});

export default Checkbox 