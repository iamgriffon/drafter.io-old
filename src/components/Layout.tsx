import { ReactNode } from "react"
import { Menu } from "./Menu"
import { Navbar } from "./Navbar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({children}: LayoutProps){
  return (
    <div className="bg-gray-800 h-screen flex flex-col justify-start items-center">
      <Navbar />
      <Menu />
      <main>{children}</main>
    </div>
  )
}