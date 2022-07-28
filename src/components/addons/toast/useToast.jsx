import { useState } from 'react'

const useToast=()=>{
    const [show, setShow]=useState(false)
    const toogle=()=>{
        setShow(true)
    }
    return {show, toogle}
}