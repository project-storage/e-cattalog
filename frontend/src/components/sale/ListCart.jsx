import React, { useState ,useEffect} from 'react'

const ListCart = () => {

    const [cart, setCart] = useState([])
    useEffect(() => {
        const dataCartJson = localStorage.getItem('listOrder')
        const dataCart = JSON.parse(dataCartJson);
        setCart(dataCart)
        console.log(cart)
    },[])

    const [check,setCheck] = useState('')

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>รายการสินค้า</th>
                        <th scope='col'>จำนวนสินค้า</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((product,index) => {
                            if(check != product.type){
                                <tr>
                                    <td colSpan={3}><input type="range" /></td>
                                </tr>
                                setCheck(product.type)
                            }
                            <tr>
                                <td>{index+1}</td>
                                <td>{product.productName}</td>
                                <td>{product.qty}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>

    )
}

export default ListCart