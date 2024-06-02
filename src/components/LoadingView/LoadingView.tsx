import './style.css'


interface LoadingViewProps {
  count: number
  percent: number
}

const LoadingView = ({count, percent}: LoadingViewProps) => {
  return (



    <div className='loading'>

      <p className='text'>Loading</p>

    </div>
  )
}

export default LoadingView