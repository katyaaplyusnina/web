import React from 'react'

const FormInput = React.forwardRef(({ id, label, type, placeholder, error, ...props }, ref) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          className="form-input"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
});

export default FormInput 