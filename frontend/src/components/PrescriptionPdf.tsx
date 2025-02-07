import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: { marginBottom: 10, padding: 10, borderBottom: "1px solid #ccc" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  text: { fontSize: 14 },
  link: { fontSize: 14, color: "blue", textDecoration: "underline" },
});

const PrescriptionPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Prescription</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>General Instructions: {data.general_instructions}</Text>
      </View>

      {/* Loop through Medicines */}
      {data.medicines.map((medicine: any, index: number) => (
        <View key={index} style={styles.section} wrap={false}>
          <Text style={styles.text}>Medicine: {medicine.name}</Text>
          <Text style={styles.text}>Dosage: {medicine.dosage}</Text>
          <Text style={styles.text}>Frequency: {medicine.frequency}</Text>
          <Text style={styles.text}>Route: {medicine.route}</Text>
          <Text style={styles.text}>Instructions: {medicine.special_instructions}</Text>

          {/* Websites Section */}
          {medicine.websites.map((website: any, idx: number) => (
            <View key={idx} style={[styles.section, { marginTop: 5 }]} wrap={false}>
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
