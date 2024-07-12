import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'outline'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant = 'default',
	...rest
}) => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.default]: variant === 'default',
				[styles.outline]: variant === 'outline'
			})}
			{...rest}
		>
			{children}
		</button>
	)
}

export default Button
