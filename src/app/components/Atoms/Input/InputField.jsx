import React from 'react'

export default function InputField(props) {
    const { type, placeholder, className,id, register,  error,
      valueAsNumber,name,valueAsDate } = props
  return (
    <>
     <div className="form-group">
     <input className={`form-control ${className}`} type={type || 'text'} id={id} placeholder={placeholder} name={name} {...register(name,{valueAsNumber,valueAsDate})} />
     {error && <span className="error-message">{error.message}</span>}
     </div>

    </>
  )
}
