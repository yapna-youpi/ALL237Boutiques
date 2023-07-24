import React from 'react'

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import './card.css'
import Chart from 'react-apexcharts'
import {UilTimes} from '@iconscout/react-unicons'

const Card = (props) => {

  const [expanded, setExpanded] = React.useState(false)

  return (
    <AnimateSharedLayout>
      {
        expanded ? <ExpandedCard param={props} setExpanded={()=>setExpanded(false)} /> : <CompactCard param={props} setExpanded={()=>setExpanded(true)} />
      }
    </AnimateSharedLayout>
  )
}

//compact card
function CompactCard({param, setExpanded}) {
  const Png = param.png;

  return(
    <AnimatePresence>
    <motion.div className="CompactCard"
        style={{
            background: param.color.backGround,
            boxShadow: param.color.boxShadow
          }
        }
        layoutId='expandableCard'

        onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar 
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>

      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 Hours</span>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

function ExpandedCard({param, setExpanded}) {
  const data = {
    options: {
      chart: {
         type: "area",
         height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        color: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      color: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/YY HH:mm"
        },
      },
      grid: {
        show: true,
      },
      xaxis:{
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.00z",
          "2018-09-19T01:30:00.00z",
          "2018-09-19T02:30:00.00z",
          "2018-09-19T03:30:00.00z",
          "2018-09-19T04:30:00.00z",
          "2018-09-19T05:30:00.00z",
          "2018-09-19T06:30:00.00z",
        ]
      },
      background: '#fff',

    }
  }

  return(
    <motion.div className="Expandedcard"
      style={{
        background: param.color.backGround,
        boxSadhow: param.color.boxShadow,
      }}
      layoutId='expandableCard'
     
    >
      <div  style={{alignSelf: 'flex-end', sursor: 'pointer', color: 'white'}}>
        <UilTimes onClick={setExpanded}
         

        />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart series={param.series} type="area" options={data.options} />
      </div>
      <span>Last 24 Hours</span>
    </motion.div>
  )
}

export default Card