import React, { useEffect, useState } from 'react'
import LogoSearch from './LogoSearch'
import ProfileCard from './ProfileCard'
import FollowersCard from './FollowersCard'
import MyProfile from './MyProfile'
import { useLocation } from 'react-router-dom'

export default function Profile({toggle}) {

  const [currentAddress, setCurrentAddress] = useState("/")

  const location = useLocation();

  useEffect(()=>{
    setCurrentAddress(location.pathname)
  },[location])



  return (
    <div className='md:flex hidden flex-col justify-center items-center gap-3 overflow-hidden h-[130vh]'>
      <LogoSearch />
      {
        currentAddress !== "/profile" ? <ProfileCard /> : <MyProfile toggle={toggle} />
      }
      
      <FollowersCard />
    </div>
  )
}
