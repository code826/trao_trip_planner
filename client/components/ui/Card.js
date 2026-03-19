const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'default',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  }

  const classes = `
    glass-card
    ${paddingStyles[padding]}
    ${hover ? 'card-hover cursor-pointer' : ''}
    ${className}
  `

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
