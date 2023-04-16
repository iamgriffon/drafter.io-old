import Head from "next/head"
import { ReactNode } from "react"
import { Menu } from "../Menu"
import { Navbar } from "./Navbar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({children}: LayoutProps){
  return (
    <div className="bg-gray-800 w-full h-fit flex flex-col justify-start items-center">
      <Head>
        <title>Drafter.io - Home</title>
      </Head>
      <Navbar />
      <Menu />
      <main>{children}</main>
    </div>
  )
}