import React,{useState, useEffect} from 'react'
import Countdown from 'react-countdown';
import { Container,Row,Col } from 'reactstrap';

import './clock.css'

const Clock = ({durée}) => {
    
    const [days,setDays] = useState()
    const [hours,setHours] = useState()
    const [minutes,setMinutes] = useState()
    const [seconds,setSeconds] = useState()

    // Random component
    const Completionist = () => <span>Votre offre est arrivée a epiration!</span>;

    // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}
      </span>
    );
  }
  };

  // const counting = (atemps,{ hours, minutes, seconds, completed })=><Countdown
  //   date={Date.now() + atemps}
  //   renderer={()=>renderer({ hours, minutes, seconds, completed })}
  // />
  
    return (
      <Container>
        <Row>
          <Col lg="12" className="mx-auto">
            <div className="clock_wrapper d-flex align-items-center gap-3">
              <div className="clock_data d-flex align-items-center gap-3">
                <div className="">
                  <h1 className="fs-3 mb-0">
                    <Countdown
                      date={Date.now() + durée}
                      renderer={({ days }) => <span>{days}</span>}
                    />
                  </h1>
                  <h5 className="fs-6">days</h5>
                </div>
                <span className="fs-3">:</span>
              </div>

              <div className="clock_data d-flex align-items-center gap-3">
                <div className="">
                  <h1 className="fs-3 mb-0">
                    <Countdown
                      date={Date.now() + durée}
                      renderer={({ hours }) => <span>{hours}</span>}
                    />
                  </h1>
                  <h5 className="fs-6">heures</h5>
                </div>
                <span className="fs-3">:</span>
              </div>

              <div className="clock_data d-flex align-items-center gap-3">
                <div className="">
                  <h1 className="fs-3 mb-0">
                    <Countdown
                      date={Date.now() + durée}
                      renderer={({ minutes }) => <span>{minutes}</span>}
                    />
                  </h1>
                  <h5 className="fs-6">minutes</h5>
                </div>
                <span className="fs-3">:</span>
              </div>

              <div className="clock_data d-flex align-items-center gap-3">
                <div className="">
                  <h1 className="fs-3 mb-0">
                    <Countdown
                      date={Date.now() + durée}
                      renderer={({ seconds }) => <span>{seconds}</span>}
                    />
                  </h1>
                  <h5 className="fs-6">secondes</h5>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
}

export default Clock