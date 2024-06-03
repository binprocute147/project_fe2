'use client'

import './style.css'
import { Component, ComponentType, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import {Render} from '@/three/setup/Render'
import MobileControls from '@/components/MobileControls/MobileControls';
import { GameMenuWrapper } from '@/components/GameMenuWrapper/GameMenuWrapper';
import LoadingView from '@/components/LoadingView/LoadingView';
import { InitMenu } from '@/components/GameMenuWrapper/InitMenu';
import { GameState } from '@/three/game/helpers/GameState';
import { SceneManager } from '@/three/setup/SceneManager';
import { GameOverMenu } from '@/components/GameMenuWrapper/GameOverMenu';
import { LoadingThreejs } from '@/hooks/LoadingThreejs';

// Định nghĩa kiểu props cho component Menu
interface typeProps {
  setSeconds: Dispatch<SetStateAction<number>>
  setShowMenu: Dispatch<SetStateAction<boolean>>
  setStart: Dispatch<SetStateAction<boolean>>
  showMenu: boolean
  path?: string
}

// Định nghĩa kiểu props cho component Menu
interface MenuProps {
  MenuComponent: ComponentType<typeProps>
}

// Component chính của trang
export default function Home() {

  // Các state của trang
  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(3)
  const [showMenu, setShowMenu] = useState(true)
  const [path, setPath] = useState<string>('/menu/lose.png')
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED)

  // Hook LoadingThreejs để tải các tài nguyên 3D
  const loadThree = LoadingThreejs()

  // Sử dụng useEffect để khởi tạo và cấu hình Render khi component được mount lần đầu tiên
  useEffect(() => {
    if(!loadThree) return
    const render = Render.getInstance(loadThree)
    SceneManager.setState = setGameState
    render.loop()
  }, []);

  // Sử dụng useEffect để theo dõi thay đổi trong gameState và thực hiện các hành động tương ứng
  useEffect(() => {
    if(gameState === GameState.GAME_OVER){
      setPath('/menu/lose.png')
      setShowMenu(true)
      setStart(false)
    }
    if(gameState === GameState.WIN){
      setPath('/menu/win.png')
      setShowMenu(true)
      setStart(false)
    }
  }, [gameState]);

  // Component Menu nhận và hiển thị các menu khác nhau dựa trên gameState
  const Menu = ({ MenuComponent }:MenuProps) => (
    <MenuComponent
      setSeconds={setSeconds}
      setShowMenu={setShowMenu}
      setStart={setStart}
      showMenu={showMenu}
      path={path}
    />
  );

  // Trả về JSX để hiển thị nội dung của trang
  return (
    <main className="main relative" >
      {/* Hiển thị menu nếu showMenu là true */}
      {
        showMenu &&
        <GameMenuWrapper>
          {gameState === GameState.PAUSED && <Menu MenuComponent={InitMenu} />}
          {(gameState === GameState.GAME_OVER || gameState === GameState.WIN) && <Menu MenuComponent={GameOverMenu} />}
        </GameMenuWrapper>
      }
      {/* Hiển thị countdown nếu showMenu và start đều là false */}
      {
        (!showMenu && !start) &&
        <div className='interval'>
          <div className='countdown'>{seconds}</div>
        </div>
      }
      {/* Hiển thị canvas để vẽ đồ họa 3D */}
      <canvas id="three" className='absolute -z-10'></canvas>
      {/* Hiển thị loading view nếu modelCount < 1 */}
      { 
        loadThree.modelCount < 1 && 
          <LoadingView 
            count={loadThree.modelCount}
            percent={loadThree.progress}
          />
      }
      {/* Hiển thị controls cho điện thoại di động */}
      <MobileControls />
    </main>
  );
}
