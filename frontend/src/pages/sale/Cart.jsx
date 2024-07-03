import React from 'react'
import ListCart from '../../components/sale/ListCart'
import SelectCustomer from '../../components/sale/SelectCustomer'

const Cart = () => {
    return (
        <>
            <div className="row">
                <div className="col-8">
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
                               <SelectCustomer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart