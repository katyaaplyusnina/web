import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import SocialLogin from './SocialLogin'
import FormInput from './FormInput'
import PasswordInput from './PasswordInput'
import Checkbox from './Checkbox'
import SubmitButton from './SubmitButton'
import FormLinks from './FormLinks'

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  })
  const [isShaking, setIsShaking] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  })

  const watchedPassword = watch('password', '')

  // Валидация пароля в реальном времени
  useEffect(() => {
    const password = watchedPassword
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    })
  }, [watchedPassword])

  // Загрузка сохраненных данных
  useEffect(() => {
    const savedData = localStorage.getItem('authFormData')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.remember) {
          setValue('email', data.email || '')
          setValue('password', data.password || '')
          setValue('remember', true)
        }
      } catch (error) {
        console.error('Ошибка загрузки сохраненных данных:', error)
        localStorage.removeItem('authFormData')
      }
    }
  }, [setValue])

  // Сохранение данных
  const saveFormData = (data) => {
    if (data.remember) {
      localStorage.setItem('authFormData', JSON.stringify(data))
    } else {
      localStorage.removeItem('authFormData')
    }
  }

  // Валидация email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    
    if (!email) return 'Email или телефон обязателен'
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      return 'Введите корректный email или телефон'
    }
    return true
  }

  // Валидация пароля
  const validatePassword = (password) => {
    if (!password) return 'Пароль обязателен'
    
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }

    const isValid = Object.values(requirements).every(req => req)
    
    if (!isValid) {
      return 'Пароль не соответствует требованиям'
    }
    
    return true
  }

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 820)
  }

  const onValid = async (data) => {
    setIsSubmitting(true)
    // Имитация проверки
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (data.email !== 'test@example.com' || data.password !== 'Test123!@#') {
      triggerShake()
    } else {
      console.log('Success:', data)
      // Сохранение данных если отмечен чекбокс
      saveFormData(data)
      
      toast.success('Успешная авторизация!')
      
      // Сброс формы
      setTimeout(() => {
        setValue('email', '')
        setValue('password', '')
        setValue('remember', false)
        localStorage.removeItem('authFormData')
      }, 3000)
    }
    setIsSubmitting(false)
  }

  const onInvalid = () => {
    triggerShake()
  }

  return (
    <section className={`form-container ${isShaking ? 'shake' : ''}`}>
      <h2 className="auth-title text-gradient">Вход в систему</h2>
      <p className="auth-subtitle">Войдите в свой аккаунт для продолжения</p>
      
      <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
        <SocialLogin />
        
        <FormInput
          id="email"
          label="Email или телефон"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          {...register('email', { 
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Введите корректный email'
            }
          })}
        />
        
        <PasswordInput 
          id="password"
          label="Пароль"
          placeholder="••••••••"
          error={errors.password}
          password={watchedPassword}
          {...register('password', { 
            required: 'Пароль обязателен',
          })}
        />

        <div className="form-options">
          <Checkbox 
            id="remember"
            label="Запомнить меня"
            {...register('remember')}
          />
          <FormLinks />
        </div>

        <SubmitButton 
          text="Войти"
          isLoading={isSubmitting}
        />
      </form>
    </section>
  )
}

export default AuthForm 