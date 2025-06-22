import React from 'react'

const SubmitButton = ({ text, isLoading }) => {
  return (
    <button type="submit" className="submit-btn" disabled={isLoading}>
      {isLoading ? (
        <>
          <div className="loading-spinner"></div>
          <span>Вход...</span>
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default SubmitButton 