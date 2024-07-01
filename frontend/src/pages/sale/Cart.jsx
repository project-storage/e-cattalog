import React from 'react'
import ListCart from '../../components/sale/ListCart'

const Cart = () => {
    return (
        <>
            <div className="row">
                <div className="col-7">
                    <div className="container">
                        <div className="card my-3 shadow">
                            <div className="card-body">
                                <ListCart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="container">
                        <div className="card my-3 shadow">
                            <div className="card-body">
                                <ListCart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart