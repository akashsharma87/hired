import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
        <main className="min-h-screen container p-10">
        <Header/>
        <Outlet/>
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">trying to finish it early</div>

      
    </div>
  )
}

export default AppLayout
