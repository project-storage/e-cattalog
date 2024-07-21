import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import fontRegular from '../../font/Kanit-Regular.ttf'


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
    },

    boxFooter: {
        flexDirection: "row",
        width: "100%",
        height: "15%",
    },
    subBoxFooter: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: "50%"
    },

    footer: {
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center"
    },

    whFull: {
        width: "90%",
        height: "90%",
        margin: "10px",
        border: 1,
        display: "flex",
        justifyContent: "center"
    }

});


const DownloadPDF = (dataOrder) => {

    let today = new Date()
    let type = "jjjjjjj";
    const [table, setTable] = useState([])

    let Pretable = []

    useEffect(() => {
        dataOrder.dataOrder.products && dataOrder.dataOrder.products.forEach((data, index) => {
            console.log(data)
            if (data.product.category.name != type) {
                Pretable.push(
                    <View style={styles.tr}>
                        <View style={{ width: "100%" }}><Text style={{ fontSize: 10, borderBottom: 1, borderTop: 1, paddingLeft: "10px" }}>{data.product.category.name}</Text></View>
                    </View>
                )
                type = data.product.category.name
            }

            Pretable.push(<View style={styles.tr} key={index}>
                <View style={{ width: "10%", borderRight: 1 }}>
                    <Text style={styles.text}>{index + 1}</Text>
                </View>
                <View style={{ width: "30%", borderRight: 1 }}>
                    <Text style={styles.text}>{data.product.name}</Text>
                </View>
                <View style={{ width: "10%", borderRight: 1 }}>
                    <Text style={styles.text}>{/* ไม่มีข้อมูลที่แสดง */}</Text>
                </View>
                <View style={{ width: "10%", borderRight: 1 }}>
                    <Text style={styles.text}>{data.qty}</Text>
                </View>
                <View style={{ width: "10%", borderRight: 1 }}>
                    <Text style={styles.text}>{/* ไม่มีข้อมูลที่แสดง */}</Text>
                </View>
                <View style={{ width: "10%", borderRight: 1 }}>
                    <Text style={styles.text}>{data.product.price}</Text>
                </View>
                <View style={{ width: "5%", borderRight: 1 }}>
                    <Text style={styles.text}>{data.discount}</Text>
                </View>
                <View style={{ width: "15%" }}>
                    <Text style={styles.text}>{data.finalPrice}</Text>
                </View>
            </View>
            )

        })
        setTable(Pretable)
    }, [dataOrder.dataOrder])

    const vat = dataOrder.dataOrder.totalPrice * 0.07
    const total = parseFloat(dataOrder.dataOrder.totalPrice) + vat
    return (
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
                        <Text style={styles.textCustomer}>Customer : {dataOrder.dataOrder.customer && `${dataOrder.dataOrder.customer.title} ${dataOrder.dataOrder.customer.firstName} ${dataOrder.dataOrder.customer.lastName}`}</Text>
                        <Text style={styles.textCustomer}>Address : {dataOrder.dataOrder.customer && `${dataOrder.dataOrder.customer.address}`}</Text>
                        <Text style={styles.textCustomer}>Tel.&Fax : {dataOrder.dataOrder.customer && `${dataOrder.dataOrder.customer.tel}`}</Text>
                        <Text style={styles.textCustomer}>Email :{dataOrder.dataOrder.customer && `${dataOrder.dataOrder.customer.email}`}</Text>
                        <Text style={styles.textCustomer}>Project :{`${dataOrder.dataOrder.project}`}</Text>
                    </View>
                    <View style={styles.boxCatagory}>
                        <Text style={styles.textCatagory}>ใบเสนอราคา</Text>
                        <Text style={styles.textCatagory}>QUOTATION</Text>
                        <Text style={{ margin: "10px" }}></Text>
                        <Text style={styles.textCatagory}>Est. No. :</Text>
                        <Text style={styles.textCatagory}>Date : {dataOrder.date}</Text>

                    </View>
                </View>
                <View>
                    <Text style={styles.textBold}> บริษัทฯ มีคามยินดีเสนอราคาดังรายละเอียกต่อไปนี้</Text>
                </View>
                {/* table start */}
                <View style={styles.table}>
                    <View style={styles.tHead}>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={styles.text}>Item</Text>
                        </View>
                        <View style={{ width: "30%", borderRight: 1 }}>
                            <Text style={styles.text}>Description</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={styles.text}>Particle</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={styles.text}>Qty</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={styles.text}>Unit</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={styles.text}>Unit Price</Text>
                        </View>
                        <View style={{ width: "5%", borderRight: 1 }}>
                            <Text style={styles.text}>Dis%</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={styles.text}>Total Price</Text>
                        </View>

                    </View>
                    {table}


                    <View style={{ borderBottom: 1, borderTop: 1 }}>
                        <View style={{ width: "100%" }}>
                            <Text style={{ marginLeft: "15px", fontSize: 10, color: "red" }}>ราคานี้ไม่รวมค่าจัดส่ง</Text>
                        </View>
                    </View>


                    <View style={styles.tr}>
                        <View style={{ width: "70%", borderRight: 1 }}>
                            <Text style={{ paddingLeft: "15px", fontSize: 10, backgroundColor: "#6FBA44" }}>เงื่อนไข  : เครดิต 30 วัน</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}><Text style={{ fontSize: 10 }}>Total</Text></View>
                        <View style={{ width: "5%", borderRight: 1 }}></View>
                        <View style={{ width: "15%" }}>
                            <Text style={{ textAlign: "right", fontSize: 10 }}>{parseFloat(dataOrder.dataOrder.totalPrice).toFixed([2])}</Text>
                        </View>
                    </View>
                    <View style={styles.tr}>
                        <View style={{ width: "70%", borderRight: 1, backgroundColor: "#6FBA44" }}>
                            <Text style={{ marginLeft: "15px", fontSize: 10 }}>Validity  : 7 วัน นับจากวันที่เสนอราคา</Text>
                        </View>
                        <View style={{ width: "10%", borderRight: 1 }}>
                            <Text style={{ fontSize: 10 }}>VAT 7%</Text>
                        </View>
                        <View style={{ width: "5%", borderRight: 1 }}></View>
                        <View style={{ width: "15%" }}>
                            <Text style={{ textAlign: "right", fontSize: 10 }}>{vat.toFixed([2])}</Text>
                        </View>
                    </View>
                    <View style={styles.tr}>
                        <View style={{ width: "70%", borderRight: 1, backgroundColor: "#6FBA44" }}>
                            <Text style={{ marginLeft: "15px", fontSize: 10 }}>หมายเหตุ  : กรณีที่มีการเปลี่ยนแปลงจากรายละเอียดที่เสนอราคาบริษัทขอสงวนสิทธิ์ในการเสนอ</Text>
                        </View>
                        <View style={{ width: "15%", borderRight: 1, borderTop: 1 }}><Text style={{ fontSize: 10 }}>Total Amount</Text></View>
                        <View style={{ width: "15%" }}>
                            <Text style={{ textAlign: "right", fontSize: 10 }}>{total.toFixed([2])}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxFooter}>
                    <View style={styles.subBoxFooter}>
                        <Text style={styles.footer}>.............{dataOrder.dataOrder.sale && `${dataOrder.dataOrder.sale.firstName} ${dataOrder.dataOrder.sale.lastName}`}................</Text>
                        <Text style={styles.footer}>Sales Meketinf Director</Text>
                        <Text style={styles.footer}>{dataOrder.dataOrder.customer && `(${dataOrder.dataOrder.customer.title} ${dataOrder.dataOrder.customer.firstName} ${dataOrder.dataOrder.customer.lastName})`}</Text>
                        <Text style={styles.footer}>Tel: {dataOrder.dataOrder.customer && dataOrder.dataOrder.customer.tel}</Text>
                    </View>
                    <View style={styles.subBoxFooter}>
                        <View style={styles.whFull}>
                            <Text style={{ fontSize: 10, textAlign: "center" }}>ลงชื่อ........{dataOrder.dataOrder.customer && `${dataOrder.dataOrder.customer.firstName} ${dataOrder.dataOrder.customer.lastName}`}.........ผู้สั่งซื้อ</Text>
                            <Text style={{ fontSize: 10, textAlign: "center" }}>วันที่....{today.getDate()}...../........{today.getMonth()}....../....{today.getFullYear()}....</Text>
                            <Text style={{ fontSize: 10, textAlign: "center" }}>ยืนยันการสั่งซื้อตามรายการนี้</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default DownloadPDF