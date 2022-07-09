import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useId, useState } from 'react'
import { CityScene } from '../three js/CityScene'

const Home: NextPage = () => {
  const [runOnce,setRunOnce] = useState(false)
  const containerId = useId()
  const [three,setThree] = useState<CityScene | null>(null)
  useEffect(()=>{
    if(!runOnce || !three){
      const container = document.getElementById(containerId)
      if(container){
        setThree(new CityScene(container))
      }  
      setRunOnce(true)
    }
    
  },[])
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.threeJsContainer} id = {containerId}></div>
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}

export default Home
