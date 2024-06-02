import './style.css'
import { FunctionComponent } from 'react'

interface GameMenuProps {
  children : React.ReactNode
}

export const GameMenuWrapper: FunctionComponent<GameMenuProps> = ({children}) => {


  
  return (
    <div className='menu-container'>
      {children}
    </div>
  )
}
