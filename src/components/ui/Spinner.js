import React from 'react'
import LoaderSpinner from '../../images/Spinner.svg'


const Spinner = () => {
  return (
    <div style={{
        
        display:'flex',
        justifyContent:'center',
        height:'80vh',
        alignItems:'center'

        }}>

        <img src={LoaderSpinner} alt="spinner" />
    </div>
    
  )
}

export default Spinner