import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from './../Assests/bill.gif'

const InvoiceTemplate = ({ invoiceData }) => {
  let customer = invoiceData.detail[0];
  console.log(customer)
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Customer Details:</Text>
          </View>
          <Text style={styles.customerText}>Customer: {customer.cus_name}</Text>
          <Text style={styles.customerText}>Address: {customer.cus_address}</Text>
          <Text style={styles.customerText}>Email: {customer.cus_email}</Text>
          <Text style={styles.customerText}>Phone Number: {customer.cus_mobile}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Invoice Details:</Text>
          </View>
          <View style={styles.rightAligned}>
            <Text>#Invoice No: {invoiceData.bill_number}</Text>
            <Text>Date: {new Date(invoiceData.date).toLocaleDateString()}</Text>
          </View>          
        </View>
        <View style={styles.section}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Items:</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Code</Text>
              <Text style={styles.tableCell}>Name</Text>
              <Text style={styles.tableCell}>Quantity</Text>
              <Text style={styles.tableCell}>Rate</Text>
              <Text style={styles.tableCell}>Amount</Text>              
            </View>
            {invoiceData.detail.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.item_cd}</Text>
                <Text style={styles.tableCell}>{item.item_name}</Text>
                <Text style={styles.tableCell}>{item.item_qty}</Text>
                <Text style={styles.tableCell}>{item.item_rate}</Text>
                <Text style={styles.tableCell}>{item.amount}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>          
          <View style={styles.rightAligned}>
          <Text>Total: {invoiceData.amount}</Text>          
          <Text>CGST Amount: {invoiceData.cgst_amt}</Text>
          <Text>SGST Amount: {invoiceData.sgst_amt}</Text>
          <Text>IGST Amount: {invoiceData.igst_amt}</Text>
          <Text>Tax Value: {invoiceData.tax_value}</Text>
          <Text>Gross Total Amount: {invoiceData.total}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'maroon',
    textDecoration: 'underline',
  },
  section: {
    marginVertical: 10,
  },
  headingContainer: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 16,
    textAlign: 'center',
    color: 'maroon',
    textDecoration: 'underline',
  },
  customerText: {
    marginBottom: 2,
    fontSize: 14,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    border: '1px solid #000',
    padding: 5,
  },
  rightAligned: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

export default InvoiceTemplate;
