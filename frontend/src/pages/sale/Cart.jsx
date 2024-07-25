import React from 'react';
import ListCart from '../../components/sale/ListCart';
import SelectCustomer from '../../components/sale/SelectCustomer';

const Cart = () => {
    return (
        <div className='p-3'>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">ตะกร้าสินค้า</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">sale</a></li>
                                <li className="breadcrumb-item active">cart</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
            <div className="row">
                <div className="col-12 col-md-8">
                    <div className="container">
                        <div className="card my-3 shadow">
                            <div className="card-body">
                                <ListCart />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="container">
                        <div className="card my-3 shadow">
                            <div className="card-body">
                                <SelectCustomer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
