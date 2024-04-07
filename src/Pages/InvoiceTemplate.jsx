import React from 'react';
import { PDFViewer, Text, View } from '@react-pdf/renderer';
import { MDBContainer, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';

const InvoiceTemplate = ({ invoiceData }) => {
  console.log("in",invoiceData)
  let customer=invoiceData.detail[0]
  return (
    <PDFViewer width="1000" height="600">
      <View className="my-5">
        <View>
          <Text className="text-center">
            <Text>Invoice</Text>
          </Text>
        </View>
        <View>
          <Text>Customer: {customer.cus_name}</Text>
          <Text>Address: {customer.cus_address}</Text>
          <Text>Email: {customer.cus_email}</Text>
          <Text>Phone Number: {customer.cus_phone}</Text>
        </View>
        <View>
          <Text>Invoice Number: {invoiceData.bill_number}</Text>
          <Text>Date: {new Date(invoiceData.date).toLocaleDateString()}</Text>
        </View>
        <View>
          <MDBTable bordered>
            <MDBTableHead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Item Quantity</th>
                <th>Item Rate</th>
                <th>Item Amount</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {invoiceData.detail.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_cd}</td>
                  <td>{item.item_name}</td>
                  <td>{item.item_qty}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </View>
        <View>
          <Text>Total: {invoiceData.amount}</Text>
          <Text>CGST Amount: {invoiceData.cgst_amt}</Text>
          <Text>IGST Amount: {invoiceData.igst_amt}</Text>
          <Text>SGST Amount: {invoiceData.sgst_amt}</Text>
          <Text>Tax Value: {invoiceData.tax_value}</Text>
        </View>
        <View>
          <Text>Gross Total Amount: {invoiceData.total}</Text>
        </View>
      </View>
    </PDFViewer>
  );
};

export default InvoiceTemplate;
