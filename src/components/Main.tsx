import { ReactNode } from "react";

export interface IMainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className }: IMainProps) {
  return (
    <main style={{
      padding: '3rem 0',
      width: 'min(90%, 1300px)',
      margin: 'auto',
      height: '100%'
    }} className={className}>
      {children}
    </main>
  )
}