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

interface typeProps {
  setSeconds: Dispatch<SetStateAction<number>>
  setShowMenu: Dispatch<SetStateAction<boolean>>
  setStart: Dispatch<SetStateAction<boolean>>
  showMenu: boolean
  path?: string
}
interface MenuProps {
  MenuComponent: ComponentType<typeProps>
}

export default function Home() {

  const [start, setStart] = useState(false)
  const [seconds, setSeconds] = useState(3)
  const [showMenu, setShowMenu] = useState(true)
  const [path, setPath] = useState<string>('/menu/lose.png')
  const [gameState, setGameState] = useState<GameState>(GameState.PAUSED)

  const loadThree = LoadingThreejs()


  useEffect(() => {
    if(!loadThree)return
    const render = Render.getInstance(loadThree)
    SceneManager.setState = setGameState
    render.loop()
  }, []);

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

  const Menu = ({ MenuComponent }:MenuProps) => (
    <MenuComponent
      setSeconds={setSeconds}
      setShowMenu={setShowMenu}
      setStart={setStart}
      showMenu={showMenu}
      path={path}
    />
  );


  return (
    <main className="main relative" >
      {
        showMenu &&
        <GameMenuWrapper>
          {gameState === GameState.PAUSED && <Menu MenuComponent={InitMenu} />}
          {(gameState === GameState.GAME_OVER || gameState === GameState.WIN) && <Menu MenuComponent={GameOverMenu} />}
        </GameMenuWrapper>
      }
      {
        (!showMenu && !start) &&
        <div className='interval'>
          <div className='countdown'>{seconds}</div>
        </div>
      }

      <canvas id="three" className='absolute -z-10'></canvas>
      { 
        loadThree.modelCount < 1 && 
          <LoadingView 
            count={loadThree.modelCount}
            percent={loadThree.progress}
          />
      }
      <MobileControls />

    </main>
  );
}
