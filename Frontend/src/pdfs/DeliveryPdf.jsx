import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create PDF component
const DeliveryPdf = ({ data }) => {
    console.log(data); // Asegurarse de que los datos se estén pasando correctamente
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Delivery Note</Text>
            <Text>Sale ID: {data.sale_id}</Text>
            <Text>Deliverer ID: {data.deliverer_id}</Text>
            <Text>Address ID: {data.address_id}</Text>
            <Text>Customer ID: {data.customer_id}</Text>
            <Text>Sale Product ID: {data.saleProduct_id}</Text>
          </View>
        </Page>
      </Document>
    );
  };

export default DeliveryPdf;
