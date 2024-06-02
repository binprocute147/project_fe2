
import React from 'react'
import  Image  from 'next/image';
import StartCountDown from '@/hooks/StartCountDown';
import { SceneManager } from '@/three/setup/SceneManager';

interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  showMenu: boolean
  path?: string
}

export const  GameOverMenu = ({setSeconds, setShowMenu, setStart, showMenu, path = ''}: InitMenuProps) => {

  const {initCountdown} = StartCountDown({setSeconds, setShowMenu, setStart, showMenu})


  return (
    <div className='menu'>

      <div>
        <Image src={path} width={100} height={30} alt='' />
      </div>

      <div onClick={() => {
        SceneManager.restartGame()
        initCountdown()
      }} >
        <Image src='/menu/try.png' width={100} height={30} alt='' />
      </div>

    </div>
  )
}
