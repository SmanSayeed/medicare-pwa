import React from 'react'

export default function SectionHeader({children,className}) {
  return (
    <h3 className={`my-3 text-2xl ${className}`}>
        {children}
    </h3>
  )
}
