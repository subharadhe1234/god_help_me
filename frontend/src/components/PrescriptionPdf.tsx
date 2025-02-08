import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { styles } from "./styles";
// Define styles

const PrescriptionPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Prescription</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>
          General Instructions: {data.general_instructions}
        </Text>
      </View>

      {/* Loop through Medicines */}
      {data.medicines.map((medicine: any, index: number) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>Medicine: {medicine.name}</Text>
          <Text style={styles.text}>Dosage: {medicine.dosage}</Text>
          <Text style={styles.text}>Frequency: {medicine.frequency}</Text>
          <Text style={styles.text}>Route: {medicine.route}</Text>
          <Text style={styles.text}>
            Instructions: {medicine.special_instructions}
          </Text>

          {/* Websites Section */}
          {medicine.websites.map((website: any, idx: number) => (
            <View key={idx} style={{ marginTop: 5, paddingBottom: 5 }}>
              <Text style={styles.text}>Store: {website.store}</Text>
              <Text style={styles.text}>Price: Rs. {website.price}</Text>
              <Link src={website.link} style={styles.link}>
                Click here to buy
              </Link>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export default PrescriptionPDF;
