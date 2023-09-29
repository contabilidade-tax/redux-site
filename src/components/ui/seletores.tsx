import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import { SeletorProps } from '@/types'


export default function Seletores({ className, services, state, styles, switchTab }: SeletorProps) {
    return (
        <div className={cn('mb-8 h-max w-max mx-auto flex', styles.seletores, className)}>
            <div className="content flex items-center gap-6">
                <Play absoluteStrokeWidth onClick={() => switchTab(state.actualIndex - 1)} className='cursor-pointer rotate-180 rounded-full  text-blue-gray-800' fill='rgb(55 71 79)' />
                <nav className='flex gap-2'>
                    {
                        services.map((service, index) => (
                            <div key={index} onClick={() => switchTab(index)} className={cn('rounded-full bg-blue-gray-800 w-4 h-4 cursor-pointer', styles.seletor, { 'bg-primary-color': state.actualIndex === index })}></div>
                        ))
                    }
                </nav>
                <Play absoluteStrokeWidth onClick={() => switchTab(state.actualIndex + 1)} className='cursor-pointer rounded-full  text-blue-gray-800' fill='rgb(55 71 79)' />
            </div>
        </div>
    )
}