import React, { useEffect, useState } from 'react'
import productService from '../../service/productService'
const CardProduct = ({ productName, image, price }) => {
    const [cardData, setCardData] = useState([])

    const fetchProduct = async () => {
        const res = await productService.getallProduct()
        setCardData(res.data.data)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            {
                cardData.map((product, index) => (
                    <div className='col-3 my-1 mx-1' key={index}>
                        <div className="card">
                            <div className="card-body">
                                <img src={product.image} alt={product.productName} />
                                <p>{product.productName}</p>
                                <p>{product.price}</p>
                                <button className='btn btn-primary'>เพิ่มสินค้า</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default CardProduct