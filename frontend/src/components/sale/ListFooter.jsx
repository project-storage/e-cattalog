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
                    <th>#</th>
                    <th className='py-auto'>รายการสินค้า </th>
                    <th className='py-auto'>จำนวน</th>
                </tr>
            </thead>
            <tbody>
                { cart != null ? (
                    cart.map((data,index) => (
                        <tr>
                            <td className='py-auto px-auto' >{index+1}</td>
                            <td className='py-auto px-auto'>{data.productName}</td>
                            <td className='py-auto px-auto'>{data.qty}</td>
                        </tr>
                    ))):(
                        <tr>
                            <td colSpan={3}><div className="d-flex justify-content-center">ไม่มีรายการสินค้า</div></td>
                        </tr>
                    )
                }
                    
            </tbody>
        </table>
    )
}

export default ListFooter