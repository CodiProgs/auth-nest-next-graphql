import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

import styles from './Heading.module.scss'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ children, className }) => {
	return <h1 className={cn(styles.heading, className)}>{children}</h1>
}

export default Heading