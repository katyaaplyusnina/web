import React from 'react'

const FormInput = ({ id, label, type, placeholder, register, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={type}
          id={id}
          className="form-input"
          placeholder={placeholder}
          {...register}
        />
      </div>
      {error && <p className="error-message">{error.message}</p>}
    </div>
  )
}

export default FormInput 