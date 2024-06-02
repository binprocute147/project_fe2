
import { SceneManager } from '@/three/setup/SceneManager'
import React, { useState } from 'react'
import Image from 'next/image'
import StartCountDown from '@/hooks/StartCountDown'


interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu: boolean
}


export const InitMenu = ({setSeconds, setShowMenu, setStart, showMenu}: InitMenuProps) => {

  const {initCountdown} = StartCountDown({setSeconds, setShowMenu, setStart, showMenu})

  return (
    <>
      {
        showMenu &&
        <div className="menu">
          <div onClick={initCountdown}>
            <Image src="/menu/start.png" width={100} height={30} alt="logo" />
          </div>
        </div>
      }
    </>
  )
}
