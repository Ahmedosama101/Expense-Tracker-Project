'use client'
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader.'
/* import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm' */
import { useUser } from '@clerk/nextjs'
function DashboardLayout({children}) {
  
 /*  const {user}=useUser();
 
  useEffect(()=>{
    user&&checkUserBudget()
  },[user])

  const checkUserBudget=async()=>{
    const result=await db.select().from(Budgets).where(eq(Budgets.creactedBy,user?.primaryEmailAddress?.emailAdress))
    console.log(result);
  } */
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
        <DashboardHeader/>
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout
