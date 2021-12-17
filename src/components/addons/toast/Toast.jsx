import React from 'react'

import toast, { Toaster } from 'react-hot-toast'

const toastify=(type, text)=>{
    // console.log("hello toast")
    switch (type) {
        case "success":
            toast.success(text, 
                {
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        case "error":
            toast.error(text,{
                style: {
                  border: '1px solid #cc1616',
                  padding: '16px',
                  color: '#cc1616',
                },
                iconTheme: {
                  primary: '#cc1616',
                  secondary: '#FFFAEE',
                },
              })
            break
        case "info":
            toast(text,
                {
                  duration: 6000,
                }
              );
            break
        case "greet":
          toast.success(text, 
            {
            icon: '👏',
            style: {
              padding: '10px',
              background: '#cc1616',
              color: '#fff',
              fontSize: 20,
              fontWeight: 600,
            },
          })
            break
        default:
            break
    }
}

function Toast() {
    return (
        <Toaster />
    )
}

export default Toast
export { toastify }
