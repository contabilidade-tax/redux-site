import { redirect } from 'next/navigation'

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
) {
  let timeout: NodeJS.Timeout | null

  return function (...args: Parameters<F>): ReturnType<F> | void {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function redir(path: string) {
  return redirect(path)
}
