import cn from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './Field.module.scss'

interface IField extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
}

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, className, ...rest }, ref) => {
		return (
			<div className={cn(styles.field, className)}>
				<label>
					<span>{placeholder}</span>
					<input
						ref={ref}
						placeholder={placeholder}
						{...rest}
					/>
				</label>
				{error && <span className={styles.error}>{error}</span>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
