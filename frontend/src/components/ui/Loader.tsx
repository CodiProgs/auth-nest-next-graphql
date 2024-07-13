import cn from 'clsx'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'

interface ILoader {
	className?: string
}

const Loader: FC<ILoader> = ({ className }) => {
	return (
		<Loader2 className={cn(className, 'size-8 text-slate-400 animate-spin')} />
	)
}

export default Loader
