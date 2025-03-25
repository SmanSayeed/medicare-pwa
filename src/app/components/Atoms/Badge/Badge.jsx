import React from 'react'

export default function Badge({children,className,variant}) {
  return (
    <div className={`badge badge-${variant} text-${variant} text-[14px] font-semibold ${className}`}>
        {children}
    </div>
  )
}
