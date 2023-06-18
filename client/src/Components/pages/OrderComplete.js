import React from 'react'

function OrderComplete() {
    const style = {
        color: 'black',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: '99%'
    }
return (
    <div className='font-link' style={style}>
        <h1 style={{ textAlign: 'center' }}>Your Order Is Complete!</h1>
        <h2 style={{ textAlign: 'center' }}>Thank you for shopping with Nobles & Barnes</h2>
    </div>
)
}

export default OrderComplete