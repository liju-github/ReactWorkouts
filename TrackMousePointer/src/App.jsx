import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0, })

  const [animateVariant, setAnimateVariant] = useState("default");

  console.log(mouseCoordinates)

  useEffect(() => {
    const mouseMove = e => {
      let c = {
        x: e.clientX,
        y: e.clientY
      }
      setMouseCoordinates(c)
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mouseCoordinates.x-16,
      y: mouseCoordinates.y - 16,
      backgroundColor:"black"
    },
    text: {
      height: 150,
      width: 150,
      x: mouseCoordinates.x - 75,
      y: mouseCoordinates.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => {
    setAnimateVariant("text")
  }

  const textLeave = () => {
    setAnimateVariant("default")
  }

  return (
    <div className="App">

      <motion.div className='cursor'
        variants={variants}
        animate={animateVariant}
       />
      
      <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className="title">
        Hello World
      </h1>
    </div>
  )
}

export default App
