import React from 'react'

export default function ContainerFluid({children,className}) {
    return (
      <div className={`container-fluid ${className}`}>
          {children}
      </div>
    )
  }