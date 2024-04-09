import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from '../Assests/logo.png';

const InvoiceTemplate = ({ invoiceData }) => {
  let companyData={
    name:'BillBuddy',
    address:'Kolkata, West Bengal, Kol-700145',
    email:'technoid.kolkata@gmail.com',
    mobile:'4569874565'
  }
  let customer = invoiceData.detail[0];
  console.log(invoiceData);
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.pageContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Invoice</Text>
          </View>
          <View style={styles.companyHeader}>
            <Text style={styles.companyName}>{companyData.name}</Text>
            <Text style={styles.companyDet}>{companyData.address}</Text>
            <Text style={styles.companyDet}>{companyData.email}</Text>
            <Text style={styles.companyDet}>{companyData.mobile}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.billTo}>BILL TO</Text>
            <View style={styles.underline}></View>
            <Text style={styles.customerText}> {customer.cus_name}</Text>
            <Text style={styles.customerText}> {customer.cus_address}</Text>
            <Text style={styles.customerText}> {customer.cus_email}</Text>
            <Text style={styles.customerText}> {customer.cus_mobile}</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} />
            <Text style={[styles.invoiceInfo,styles.red]}>#Invoice No: {invoiceData.bill_number}</Text>
            <Text style={styles.invoiceInfo}>Date: {new Date(invoiceData.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeading}>Item Name</Text>
                <Text style={styles.tableHeading}>Item Qty</Text>
                <Text style={styles.tableHeading}>Rate</Text>
                <Text style={styles.tableHeading}>Amount</Text>
              </View>
              {invoiceData.detail.map((item, index) => (
                <View key={index} style={styles.tableRow}>
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
              <Text style={[styles.bold, styles.largeText, styles.invoiceInfo]}>Subtotal: {invoiceData.amount - invoiceData.tax_value}</Text>
              <View style={styles.underline}></View>
              {invoiceData.cgst_amt !== 0 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.bold, styles.largeText, styles.invoiceInfo]}>CGST({invoiceData.cgst_per}%):</Text>
                  <Text style={[styles.largeText, styles.invoiceInfo,styles.blue]}> {invoiceData.cgst_amt}</Text>
                  <View style={styles.underline}></View>
                </View>
              )}
              {invoiceData.sgst_amt !== 0 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.bold, styles.largeText, styles.invoiceInfo]}>SGST({invoiceData.sgst_per}%):</Text>
                  <Text style={[styles.largeText, styles.invoiceInfo,styles.blue]}> {invoiceData.sgst_amt}</Text>
                  <View style={styles.underline}></View>
                </View>
              )}
              {invoiceData.igst_amt !== 0 && (
                <View style={styles.tableRow}>
                  <Text style={[styles.bold, styles.largeText, styles.invoiceInfo]}>IGST({invoiceData.igst_per}%):</Text>
                  <Text style={[styles.largeText, styles.invoiceInfo,styles.blue]}> {invoiceData.igst_amt}</Text>
                  <View style={styles.underline}></View>
                </View>
              )}
              
              <View style={styles.underline}></View>
              <View style={styles.tableRow}>
                  <Text style={[styles.bold, styles.largerText, styles.invoiceInfo]}>Gross Amount:</Text>
                  <Text style={[styles.largerText, styles.invoiceInfo,styles.red]}> {invoiceData.amount}</Text>
                  <View style={styles.underline}></View>
                </View>
            </View>
          </View>
          <View style={styles.underline}></View>
          <View style={styles.bottomText}>
          <View style={styles.paymentStatus}>
    <Text style={[styles.bold, styles.largerText, styles.red]}>
      {invoiceData.pay ? '' : `Due On: ${new Date(invoiceData.due_date).toLocaleDateString()}`}
    </Text></View>
            <Text style={styles.bottomText}>!! Thank you for your business.</Text>
            <Text>Terms and conditions: </Text>
            <Text>     * Once Sold item can not be take back</Text>
            <Text>     * No warranty will be given if the seal is broken or in case of lost of invoice</Text>
            <Text>     * Warranty will not be applicable for handaling damage,</Text>
            
            <Text style={[styles.rightAligned,styles.center]}>This is a system-generated bill and does not require a signature.</Text>
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
  pageContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    flex: 1,
    padding: 10,
  },
  companyHeader: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
    color:'violet'
  },
  companyDet: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
   
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
  billTo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  underline: {
    borderBottom: '1px solid black',
    marginBottom: 10,
  },
  customerText: {
    marginBottom: 5,
    fontSize: 14,
  },
  invoiceInfo: {
    marginBottom: 5,
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
  },
  table: {
    width: 'auto',
    marginBottom: 10,
    border: '1px solid #000',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    padding: 5,
  },
  tableHeading: {
    flex: 1,
    textAlign: 'center',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    padding: 5,
    fontWeight: 'bold',
    color: 'blue',
  },
  rightAligned: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  bold: {
    fontWeight: 'bolder',
  },
  bolder: {
    fontWeight: 'bold'
  },
  largeText: {
    fontSize: 14,
  },
  largerText: {
    fontSize: 16,
  },
  bottomText: {
    marginTop: 25,
    fontSize:10
  },
  red:{
    color:'red'
  },
  blue:{
    color:'blue'
  },
  center:{
    textAlign: 'center',
    marginTop:15
  },
  rightText:{
    textAlign:'right'
  }
});

export default InvoiceTemplate;
