import { lazy, Suspense } from "react"

const LazyServicos = lazy(() => import('./core'))

export default function ServicosComponent() {
    return (
        <>
            <Suspense fallback={<p>Carregando...</p>}>
                <LazyServicos />
            </Suspense>
        </>
    )
}