import React from 'react'
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { emptyCart, removeFromCart } from '../../Features/ShoppingCart';
import axios from 'axios';

function Checkout() {
    const cart = useSelector((state) => state.shoppingCart.value.shopping_cart);
    const user_id = useSelector((state) => state.user.value.user_id);
    const logged_in = useSelector((state) => state.user.value.logged_in);

    const history = useNavigate();
    const dispatch = useDispatch();

    console.log("cart:", cart);
    console.log("cart type:", typeof (cart));

    let total = 0;

    const handleRemove = (key) => {
        // window.alert("hit removed!");
        console.log("hit removed:", key);
        dispatch(removeFromCart(key));
        console.log("new cart", cart);
    }

    const handleOrder = async () => {
        if (logged_in) {
            const order = {
                user_id: user_id,
                book_order: cart,
                order_total: total
            }

            try {
                await axios.post("http://localhost:5000/checkout/complete-order", order)
                    .then(
                        console.log("Ordered!!", user_id),
                        dispatch(emptyCart()),
                        history('/order-complete')
                    );
            } catch (e) {
                console.log(e);
            }
        }
        dispatch(emptyCart());
        console.log("ordered!!!!");
        history('/order-complete');

        //"/checkout/complete-order"
    }

    return (
        <span className="font-link checkout">
            {
                (cart.length === 0) ? <h1 className='checkout-empty'>Your cart is empty</h1> :
                    (
                        <div className='checkout-container'>
                            <h1>Checkout</h1>
                            <div className='checkout-left'>
                                {cart.map((book, key) => {
                                    console.log("Book:", book);
                                    console.log("Key:", key);
                                    total += (book.price?.$numberDecimal !== undefined) ? book.price.$numberDecimal : book.price;
                                    return (
                                        <div key={key} className='c-l-parent'>
                                            <div className='c-l-left'>
                                                <Link to='/product' state={book}>
                                                    <img src={book.img} />
                                                </Link>
                                            </div>
                                            <div className='c-l-right'>
                                                <p><strong>{book.title}</strong></p>
                                                <p>by <strong>{book.author}</strong></p>
                                                <p>${(book.price?.$numberDecimal !== undefined) ? book.price.$numberDecimal : book.price}</p>
                                                <div onClick={() => handleRemove(key)}>
                                                    <button>Remove Item</button>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='checkout-right'>
                                <div className='checkout-order-total'>
                                    <p><strong>Order Total</strong></p>
                                </div>
                                <div className='checkout-total'>
                                    <p>${total}</p>
                                </div>
                                <button onClick={handleOrder}>Complete Your Order</button>
                            </div>

                        </div>
                    )
            }
        </span>
    )
}

export default Checkout