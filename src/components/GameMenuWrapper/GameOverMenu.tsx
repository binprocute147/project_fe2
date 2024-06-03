import React from 'react'
import Image from 'next/image';
import StartCountDown from '@/hooks/StartCountDown';
import { SceneManager } from '@/three/setup/SceneManager';

// Định nghĩa kiểu InitMenuProps cho các thuộc tính setSeconds, setStart, setShowMenu, showMenu và path
interface InitMenuProps {
  setSeconds: React.Dispatch<React.SetStateAction<number>>; // Hàm cập nhật số giây đếm ngược
  setStart: React.Dispatch<React.SetStateAction<boolean>>; // Hàm cập nhật trạng thái bắt đầu trò chơi
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>; // Hàm cập nhật trạng thái hiển thị menu
  showMenu: boolean; // Trạng thái hiển thị menu
  path?: string; // Đường dẫn đến hình ảnh
}

// Component GameOverMenu nhận các props và hiển thị giao diện tương ứng
export const GameOverMenu = ({ setSeconds, setShowMenu, setStart, showMenu, path = '' }: InitMenuProps) => {

  // Gọi hàm initCountdown từ hook StartCountDown để bắt đầu đếm ngược trước khi bắt đầu trò chơi
  const { initCountdown } = StartCountDown({ setSeconds, setShowMenu, setStart, showMenu })

  return (
    <div className='menu'>
      {/* Hiển thị hình ảnh path */}
      <div>
        <Image src={path} width={100} height={30} alt='' />
      </div>
      {/* Khi người dùng click vào nút thử lại, gọi hàm restartGame từ SceneManager và initCountdown */}
      <div onClick={() => {
        SceneManager.restartGame()
        initCountdown()
      }} >
        <Image src='/menu/try.png' width={100} height={30} alt='' />
      </div>
    </div>
  )
}
