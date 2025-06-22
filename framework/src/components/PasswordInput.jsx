import React, { useState } from 'react'

const PasswordInput = ({ id, label, placeholder, register, error, password }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="password-input-wrapper">
        <input 
          type={isPasswordVisible ? 'text' : 'password'}
          className={`form-input password-input ${error ? 'error' : ''}`}
          placeholder={placeholder}
          {...register}
        />
        <button 
          type="button" 
          className="password-toggle" 
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
        >
          <svg className="eye-icon" viewBox="0 0 24 24">
            {isPasswordVisible ? (
              <>
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                <path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </>
            ) : (
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            )}
          </svg>
        </button>
      </div>
      {error && (
        <div className="error-message" role="alert" aria-live="polite">
          {error}
        </div>
      )}
      <div className="requirements" aria-live="polite">
        <p>Пароль должен содержать:</p>
        <ul>
          <li className={password.length ? 'valid' : ''}>Минимум 8 символов</li>
          <li className={password.uppercase ? 'valid' : ''}>Заглавную букву</li>
          <li className={password.lowercase ? 'valid' : ''}>Строчную букву</li>
          <li className={password.number ? 'valid' : ''}>Цифру</li>
          <li className={password.special ? 'valid' : ''}>Специальный символ</li>
        </ul>
      </div>
    </div>
  )
}

export default PasswordInput 