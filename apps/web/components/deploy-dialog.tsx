'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { DeploySchema } from './deploy-schema'

interface DeployModalProps {
  open: boolean
  onClose: () => void
  sqlFormat: 'mysql' | 'postgresql'
  sqlCode: string
}

export function DeployDialog({ open, onClose, sqlFormat, sqlCode }: DeployModalProps) {
  const [host, setHost] = useState('')
  const [port, setPort] = useState(sqlFormat === 'mysql' ? '3306' : '5432')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [database, setDatabase] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDeploying(true)

    setTimeout(() => {
      setIsDeploying(false)
      onClose()

      toast.success(`Schema has been deployed to ${database} on ${host}`)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Deploy to Database Server</DialogTitle>
          <DialogDescription>
            Enter your {sqlFormat === 'mysql' ? 'MySQL' : 'PostgreSQL'} server details to deploy the
            schema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='host'>Host</Label>
              <Input
                id='host'
                placeholder='localhost or IP address'
                value={host}
                onChange={(e) => setHost(e.target.value)}
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='port'>Port</Label>
              <Input
                id='port'
                placeholder={sqlFormat === 'mysql' ? '3306' : '5432'}
                value={port}
                onChange={(e) => setPort(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              placeholder='Database username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='database'>Database Name</Label>
            <Input
              id='database'
              placeholder='Database to deploy to'
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              required
            />
          </div>

          <DialogFooter className='pt-4'>
            <Button type='button' variant='outline' onClick={onClose} disabled={isDeploying}>
              Cancel
            </Button>
            <Button type='submit' disabled={isDeploying}>
              {isDeploying ? 'Deploying...' : 'Deploy Now'}
            </Button>
          </DialogFooter>
        </form>
        {/* <DeploySchema /> */}
      </DialogContent>
    </Dialog>
  )
}
