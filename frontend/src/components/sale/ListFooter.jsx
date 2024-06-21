import React, { useState ,useEffect} from 'react'

const ListFooter = () => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const dataCartJson = localStorage.getItem('listOrder')
        const dataCart = JSON.parse(dataCartJson);
        setCart(dataCart)
        console.log(cart)
    },[])
    return (
        <table className='table'>
            <thead className=''>
                <tr>
                    <th className='py-0'>รายการสินค้า </th>
                    <th className='py-0'>จำนวน</th>
                </tr>
            </thead>
            <tbody>
                { cart != null ? (
                    cart.map((data,index) => (
                        <tr>
                            <td>{data.id}</td>
                        </tr>
                    ))):(
                        <div className="d-flex mx-3 my-3justify-content-center">
                            ไม่มีรายการสินค้า
                        </div>
                    )
                }
                    
            </tbody>
        </table>
    )
}

export default ListFooter