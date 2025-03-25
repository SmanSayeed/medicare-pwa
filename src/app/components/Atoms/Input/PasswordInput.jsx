'use client'
import React, { useState } from 'react'

export default function PasswordInput(props) {
    const { type, placeholder, className,id, register, name, error} = props
    const [show, setShow] = useState(false);
    const handlePasswordShow = () => {
      setShow(!show);
    }
  return (
    <>
    <div className="form-group position-relative">
            <input className={`form-control ${className}`} id={id} type={show ? "text" : "password"} placeholder={placeholder || 'Enter Password'} name={name} {...register(name)} />
            
            <div className="position-absolute" id="password-visibility" onClick={handlePasswordShow}>
              <i className="bi bi-eye"></i>
              <i className="bi bi-eye-slash"></i>
            </div>
            
            {error && <span className="error-message">{error.message}</span>}
          </div>
    </>
  )
}
