import { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
}

export const Button: FC<ButtonProps> = ({
  href,
  variant = 'primary',
  className,
  children,
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-all duration-200'
  const variantClasses = {
    primary: 'bg-[#00D5DA] hover:bg-[#00D5DA]/90 text-black',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  }

  const combinedClasses = clsx(
    baseClasses,
    variantClasses[variant],
    className
  )

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={combinedClasses}>
      {children}
    </button>
  )
}
