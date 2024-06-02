import { useState } from "react"

interface LoaderProps {
  onProgress: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  onLoad: () => void;
  onError: (url: string) => void;
  onStart: (url: string, itemsLoaded: number, itemsTotal: number) => void;
  modelCount: number;
  progress: number;
}

export const LoadingThreejs = (): LoaderProps => {
  
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [modelCount, setModelCount] = useState(0)

  const onProgress = (url: string, itemsLoaded: number, itemsTotal: number) => {
    console.log('Loading file: ' + url)

    console.log(itemsLoaded, itemsTotal)
    setProgress(itemsLoaded / itemsTotal * 100)
  }

  const onLoad = () => {

    setModelCount(modelCount + 1)
    console.log('Loading complete!')

    setIsLoading(false)
  }

  const onError = (url: string) => {
    console.log('Error loading', url)
  }

  const onStart = (url: string, itemsLoaded: number, itemsTotal: number) => {
    setIsLoading(true)
  }


  return {
    onProgress,
    onLoad,
    onError,
    onStart,
    modelCount,
    progress
  }
}
