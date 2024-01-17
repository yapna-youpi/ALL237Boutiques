import React,{useState, useRef} from 'react'
import Sidebar from './components/sidebar/Sidebar'
import MainDash from './components/MainDash/MainDash'
import './dashboard.css'
import { motion } from 'framer-motion/dist/framer-motion.dev'

function Dashboard({location}) {
  const [select, setSelect] = useState('analytics')
  console.log(select, 'le selected')
  const myref = useRef(null)

  const anim = () => {
    myref.current.classList.toggle("open");
    let li = document.querySelectorAll(".nav-links li");
    li.forEach((link) => {
      link.classList.toggle("fade");
    });
    let target = document.querySelector(".hamburger");
    target.classList.toggle("cross");
  }
  console.log('la valeur du select', select)

  return (
    <div className="dash">
      <div className="AppGlass">
        <Sidebar setOption={setSelect} />
        <MainDash option={select} anim={anim} />
      </div>
    </div>
  );
}

export default Dashboard