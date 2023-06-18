import React, { useState, useEffect } from 'react'
import './OrderHistory.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isEmpty } from "lodash";

function OrderHistory() {
    const user_id = useSelector((state) => state.user.value.user_id);
    const logged_in = useSelector((state) => state.user.value.logged_in);

    const [res, setRes] = useState(null);

    const style = {
        color: 'black',
        position: 'fixed',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '99%'
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const toDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-")
        console.log("day:", day);
        console.log("month:", month);
        console.log("year:", year);
        console.log("number month:", Number(month));
        return new Date(year, month - 1, day)
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:5000/order-history/get-orders?user_id=${user_id}`)
                .then((response) => setRes(response.data))
        }
        fetchData();
    }, []);

    console.log("res:", res);
    console.log("res type:", typeof (res));
    return (
        <div className='font-link order-history'>
            {
                logged_in ? (
                    res === null ? (
                        <p className='loading'>Loading...</p>
                    ) :
                        (
                            isEmpty(res) ? (
                                // <div style={style}>
                                //       <p style={{ textAlign: 'center', fontSize: '10vh' }}>No orders yet</p>  
                                // </div>
                                <h1 style={{ color: 'black', textAlign:'center' }}>No orders yet</h1>
                            ) :
                                (
                                    // <p>Have orders</p>
                                    res.toReversed().map((order, key) => {
                                        console.log(order);
                                        let total = parseFloat(order.order_total.$numberDecimal.toString());

                                        let [year, m, day] = order.date.substring(0, 10).split("-");

                                        m = Number(m);
                                        let month = monthNames[m - 1];
                                        console.log("Month:", month);
                                        console.log("Book order:", order.book_order);
                                        console.log(typeof (order.book_order));

                                        return (
                                            <div key={key} className='order'>
                                                <div className='order-info'>
                                                    <p><strong>Order placed:</strong> {month} {day}, {year}</p>
                                                    <p><strong>Total:</strong> {total}</p>
                                                </div>

                                                {
                                                    order.book_order.map((book, key) => {
                                                        console.log(book);
                                                        console.log(typeof (book.price));
                                                        return (
                                                            <div key={key} className='order-book'>
                                                                <div className='order-left'>
                                                                    <Link to='/product' state={{props: book}}>
                                                                        <img src={book.img} />
                                                                    </Link>
                                                                </div>
                                                                <div className='order-right'>
                                                                    <p><strong>{book.title}</strong></p>
                                                                    <p>by <strong>{book.author}</strong></p>
                                                                    <p>${book.price}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                        )
                                    })
                                )
                        )
                ) :
                    (
                        <div style={style}>
                            <h1 style={{ textAlign: 'center' }}>You must <Link to='/login'>sign in</Link> to view your order history</h1>
                        </div>
                    )
            }

        </div >
    )
}

export default OrderHistory