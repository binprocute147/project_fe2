import { SceneManager } from '@/three/setup/SceneManager'
import React, { useState } from 'react'
import Image from 'next/image'
import StartCountDown from '@/hooks/StartCountDown'

// Định nghĩa kiểu InitMenuProps cho các thuộc tính setSeconds, setStart, setShowMenu và showMenu
interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>; // Hàm cập nhật số giây đếm ngược
  setStart: React.Dispatch<React.SetStateAction<boolean>>; // Hàm cập nhật trạng thái bắt đầu trò chơi
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>; // Hàm cập nhật trạng thái hiển thị menu
  showMenu: boolean; // Trạng thái hiển thị menu
}

// Component InitMenu nhận các props và hiển thị giao diện tương ứng
export const InitMenu = ({ setSeconds, setShowMenu, setStart, showMenu }: InitMenuProps) => {

  // Gọi hàm initCountdown từ hook StartCountDown để bắt đầu đếm ngược trước khi bắt đầu trò chơi
  const { initCountdown } = StartCountDown({ setSeconds, setShowMenu, setStart, showMenu })

  return (
    <>
      {/* Nếu showMenu là true thì hiển thị menu */}
      {showMenu &&
        <div className="menu">
          {/* Khi người dùng click vào nút bắt đầu trò chơi, gọi hàm initCountdown */}
          <div onClick={initCountdown}>
            <Image src="/menu/start.png" width={100} height={30} alt="logo" />
          </div>
        </div>
      }
    </>
  )
}
