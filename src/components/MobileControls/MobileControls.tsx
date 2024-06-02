'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {SceneManager} from '@/three/setup/SceneManager'

const MobileControls = () => {


  const [pause, setPause] = useState(false)

  const handleMovement = (direction : string) => {
    if(pause) return
    SceneManager.setLastMove(direction)
  }

  const pauseGame = () => {
    setPause(true)
    SceneManager.pauseGame()
  }

  const playGame = () => {
    setPause(false)
    SceneManager.startGame()
  }

  return (
    <div className='controls'>
      <div className='left'>
        <Image onClick={()=> handleMovement('a')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='right'>
        <Image onClick={()=> handleMovement('d')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='up'>
        <Image onClick={()=> handleMovement('w')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      <div className='down'>
        <Image onClick={()=> handleMovement('s')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>

      <div className='pause'>
        {
          pause 
          ?<Image onClick={playGame}  src='/controls/pause.png' width={50} height={50} alt='' />
          :<Image onClick={pauseGame}  src='/controls/play.png' width={50} height={50} alt='' />
        }
      </div>

    </div>
  )
}

export default MobileControls