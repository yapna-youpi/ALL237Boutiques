import React from 'react'
import {useHistory} from 'react-router-dom';

import './notfound.css'

function NotFound() {
    let history=useHistory()

    return (
        <div id="notfound" className="notfound">
            <div id="error">
                <div class="error">
                    <div class="first">
                        <div class="image"></div>
                    </div>
                    <div class="second">
                        <h1>404</h1>
                        <h3>OOPS! SOMETHING WENT WRONG</h3>
                        <p>
                            Sorry but the page you are looking for don't exist
                        </p>
                        <span onClick={()=>history.push('/')} >Back to home page</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
