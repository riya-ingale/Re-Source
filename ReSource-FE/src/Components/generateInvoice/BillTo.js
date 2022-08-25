import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36,
		justifyContent: 'flex-start',
		width: '50%'
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'        
    },
});

const BillTo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.buyername}</Text>
        <Text>{invoice.buyer_institute}</Text>
        <Text>{invoice.buyer_email}</Text>
        <Text>{invoice.buyer_phone_no}</Text>
        <Text>{invoice.buyer_position}</Text>
    </View>
);

export default BillTo