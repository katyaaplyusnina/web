import React, { useState } from 'react'

const PasswordInput = React.forwardRef(({ id, label, placeholder, error, password, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }
  
  const safePassword = password || '';

  const Requirement = ({ text, valid }) => (
    <li className={`requirement-item ${valid ? 'valid' : ''}`}>
        <svg className="requirement-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      {text}
    </li>
  );

  return (
    <div className="form-group">
      <label htmlFor={id} className="input-label">{label}</label>
      <div className="input-wrapper">
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id={id}
          className="form-input"
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
        >
          <svg className="eye-icon" viewBox="0 0 24 24" fill="currentColor">
             {isPasswordVisible ? (
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              ) : (
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              )}
          </svg>
        </button>
      </div>
      {error && <p className="error-message">{error.message}</p>}
      
      <ul className="password-requirements">
        <Requirement text="Минимум 8 символов" valid={safePassword.length >= 8} />
        <Requirement text="Заглавная буква" valid={/[A-Z]/.test(safePassword)} />
        <Requirement text="Строчная буква" valid={/[a-z]/.test(safePassword)} />
        <Requirement text="Цифра" valid={/\d/.test(safePassword)} />
        <Requirement text="Спец. символ" valid={/[!@#$%^&*(),.?":{}|<>]/.test(safePassword)} />
      </ul>
    </div>
  )
})

export default PasswordInput 