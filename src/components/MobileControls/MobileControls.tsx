'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { SceneManager } from '@/three/setup/SceneManager'

const MobileControls = () => {

  // Sử dụng hook useState để quản lý trạng thái tạm dừng
  const [pause, setPause] = useState(false)

  // Xử lý sự kiện di chuyển dựa trên hướng nhận được
  const handleMovement = (direction: string) => {
    // Nếu trò chơi đang tạm dừng thì không thực hiện bất kỳ hành động nào
    if (pause) return
    // Gọi phương thức setLastMove từ SceneManager để cập nhật hướng di chuyển của rắn
    SceneManager.setLastMove(direction)
  }

  // Hàm tạm dừng trò chơi
  const pauseGame = () => {
    // Đặt trạng thái tạm dừng là true
    setPause(true)
    // Gọi phương thức pauseGame từ SceneManager để tạm dừng trò chơi
    SceneManager.pauseGame()
  }

  // Hàm tiếp tục chơi trò chơi
  const playGame = () => {
    // Đặt trạng thái tạm dừng là false
    setPause(false)
    // Gọi phương thức startGame từ SceneManager để tiếp tục chơi trò chơi
    SceneManager.startGame()
  }

  return (
    <div className='controls'>
      {/* Nút di chuyển sang trái */}
      <div className='left'>
        <Image onClick={() => handleMovement('a')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      {/* Nút di chuyển sang phải */}
      <div className='right'>
        <Image onClick={() => handleMovement('d')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      {/* Nút di chuyển lên */}
      <div className='up'>
        <Image onClick={() => handleMovement('w')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>
      {/* Nút di chuyển xuống */}
      <div className='down'>
        <Image onClick={() => handleMovement('s')} src='/controls/arrow.png' width={50} height={50} alt='' />
      </div>

      {/* Nút tạm dừng hoặc tiếp tục chơi */}
      <div className='pause'>
        {pause
          ? <Image onClick={playGame} src='/controls/pause.png' width={50} height={50} alt='' />
          : <Image onClick={pauseGame} src='/controls/play.png' width={50} height={50} alt='' />
        }
      </div>

    </div>
  )
}

export default MobileControls
