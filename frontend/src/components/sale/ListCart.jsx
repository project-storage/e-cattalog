import React, { useState, useEffect } from 'react';

const ListCart = () => {
    const [chDiscount, setDiscount] = useState([]);
    const [dataCartSS, setDataCartSS] = useState([]);
    const [rows, setRows] = useState([]);

    const editDiscount = (e) => {
        
        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);
        console.log(dataCart)
    }
    useEffect(() => {
        const dataCartJson = localStorage.getItem('listOrder');
        const dataCart = JSON.parse(dataCartJson);
        if (dataCart) {
            setDataCartSS(dataCart);
        }
    }, []);

    useEffect(() => {
        const newRows = [];
        let check = null;

        dataCartSS.forEach((product, index) => {
            if (check !== product.type) {
                newRows.push(
                    <tr>
                        <td></td>
                        <td></td>
                        <td colSpan={3} className='d-flex justify-content-end py-0 pt-2'>
                            <p>ส่วนลด : </p>
                            <input type="text" className='form-control' name='nall' min={0} onChange={editDiscount} style={{height:"30px",width:"60px"}} max={100} />
                        </td>
                    </tr>
                );
                check = product.type;
                const data = [product.id,product.type]
                console.log(data)
                setDiscount([...chDiscount, data])
            }else{
                const data = [product.id,product.type]
                setDiscount([...chDiscount, data])
            }
            newRows.push(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.qty}</td>
                </tr>
            );
        });

        setRows(newRows);
        console.log(chDiscount)
    }, [dataCartSS]);

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
                    {rows}
                </tbody>
            </table>
        </>
    );
}

export default ListCart;
