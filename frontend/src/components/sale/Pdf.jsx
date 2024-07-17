import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import fontRegular from '../../font/Kanit-Regular.ttf'
import { useParams } from 'react-router-dom';
import orderService from '../../service/orderService'
import { PDFViewer } from '@react-pdf/renderer';


Font.register({
    family: 'Kanit',
    fonts: [
        { src: fontRegular, fontWeight: 'normal' },
    ],
});

// Create styles
const styles = StyleSheet.create({
    page: {
        width: "100%",
        backgroundColor: '#ffff',
        padding: 10,
        fontFamily: 'Kanit',
    },

    Textcompany: {
        fontSize: 10,
        textAlign: "right",
        fontWeight: "bold"
    },

    boxImage: {
        width: '20%',
        backgroundColor: "#f8f8f8"
    },

    boxCompany: {
        width: '55%',
    },

    header: {
        flexDirection: "row",
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },

    link: {
        fontSize: "10",
        color: "#317EA9"
    },

    line: {
        width: "100%",
        borderBottom: "1",
        borderBottomColor: "#000000",
        borderBottomStyle: "solid",
        marginBottom: "8px"
    },

    boxDescCus: {
        width: "100%",
        flexDirection: "row",
    },

    boxCustomer: {
        width: "60%",
        border: "1",
    },

    textCustomer: {
        fontSize: 10,
        marginLeft: "2px",
    },

    boxCatagory: {
        width: "40%",
        border: "1",
    },

    textCatagory: {
        fontSize: "10",
        textAlign: "center"
    },

    textBold: {
        fontSize: "10px",
        fontWeight: "bold",
        marginLeft: "25px",
        marginTop: "5px"
    },

    table: {
        border: 1,
        borderBottomStyle: "solid"
    },

    tHead: {
        flexDirection: "row",
        backgroundColor: "#6FBA44",
    },

    th: {
        border: 1
    },

    text: {
        fontSize: 10,
        textAlign: "center"
    },

    tr: {
        flexDirection: "row",
        backgroundColor: "#ffff"
    }
});
const Pdf = () => {
    const [dataOrder, setDataOrder] = useState([])
    const params = useParams()
    const fetchOrder = async () => {
        try {
            const res = await orderService.orderById(params.id)
            const data = res.data.data
            console.log(data)
            setDataOrder(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchOrder()
        console.log(dataOrder)
    }, [])
    return (

        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <View style={styles.boxImage}>
                            <Text style={styles.company}>image</Text>
                        </View>
                        <View style={styles.boxCompany}>
                            <Text style={styles.Textcompany}>บริษัท ยูไนเต็ด แมนยูเฟคเจอริ่ง จำกัด </Text>
                            <Text style={styles.Textcompany}>99/99 หมู่ที่2 ตำบลหอมเกล็ด </Text>
                            <Text style={styles.Textcompany}>อำเภอสามพราน จังหวัดนครปฐม 73110</Text>
                            <Text style={styles.Textcompany}>โทรศัพท์ 0-3438-8672-3 โทรสาร 0-3438-8674</Text>
                        </View>
                    </View>
                    <View style={styles.link}>
                        <Text style={styles.link}>www.unitedmanufacturing.co.th</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.boxDescCus}>
                        <View style={styles.boxCustomer}>
                            <Text style={styles.textCustomer}>Attention :</Text>
                            <Text style={styles.textCustomer}>Customer : {dataOrder.customer && `${dataOrder.customer.title} ${dataOrder.customer.firstName} ${dataOrder.customer.lastName}`}</Text>
                            <Text style={styles.textCustomer}>Address : { }</Text>
                            <Text style={styles.textCustomer}>Tel.&Fax :</Text>
                            <Text style={styles.textCustomer}>Email :</Text>
                            <Text style={styles.textCustomer}>Project :</Text>
                        </View>
                        <View style={styles.boxCatagory}>
                            <Text style={styles.textCatagory}>ใบเสนอราคา</Text>
                            <Text style={styles.textCatagory}>QUOTATION</Text>
                            <Text style={{ margin: "10px" }}></Text>
                            <Text style={styles.textCatagory}>Est. No. :</Text>
                            <Text style={styles.textCatagory}>Date : </Text>

                        </View>
                    </View>
                    <View>
                        <Text style={styles.textBold}> บริษัทฯ มีคามยินดีเสนอราคาดังรายละเอียกต่อไปนี้</Text>
                    </View>
                    {/* table start */}
                    <View style={styles.table}>
                        <View style={styles.tHead}>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Item</Text>
                            </View>
                            <View style={{ width: "30%" }}>
                                <Text style={styles.text}>Description</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Particle</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Qty</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Unit</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Unit Price</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Dis%</Text>
                            </View>
                            <View style={{ width: "10%" }}>
                                <Text style={styles.text}>Total Price</Text>
                            </View>
                        </View>
                        {dataOrder.products && dataOrder.products.map((data,index) => (
                            <View style={styles.tr}>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{index+1 }</Text>
                                </View>
                                <View style={{ width: "30%" }}>
                                    <Text style={styles.text}>{data.product.name }</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{}</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{ data.qty}</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{ }</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{data.product.price }</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{ data.discount}</Text>
                                </View>
                                <View style={{ width: "10%" }}>
                                    <Text style={styles.text}>{ data.finalPrice}</Text>
                                </View>
                            </View>
                        ))}


                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default Pdf