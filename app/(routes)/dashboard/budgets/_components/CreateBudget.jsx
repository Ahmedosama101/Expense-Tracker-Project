import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function CreateBudget() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild><div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2
            border-dashed cursor-pointer hover:shadow-md'>
              <h2 className='text-3xl'>+</h2>
              <h2>Create New Budget</h2>
            </div></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget