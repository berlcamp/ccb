'use client'
import React from 'react'
import Image from 'next/image'
import Avatar from 'react-avatar'

// types
import type { namesType } from '@/types'

interface PropTypes {
  user: namesType
}

const UserBlock = ({ user }: PropTypes) => {
  return (
    <div className='flex items-center space-x-1'>
      {
        (user.avatar_url && user.avatar_url !== '')
          ? <div className='relative rounded-lg flex items-center justify-center bg-black overflow-hidden'>
              <Image src={user.avatar_url} width={20} height={20} alt='user'/>
            </div>
          : <Avatar round={true} size="20" name={user.firstname}/>
      }
      <div className='font-medium capitalize'>{user.firstname} {user.middlename} {user.lastname}</div>
    </div>
  )
}
export default UserBlock
