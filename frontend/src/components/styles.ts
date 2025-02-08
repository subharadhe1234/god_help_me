import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: {
    // flexDirection: "row",
    marginBottom: 10, 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc", 
    borderBottomStyle: "solid",
  },
  title: { fontSize: 22, textAlign: "center", marginBottom: 10 },
  text: { fontSize: 14 },
  link: { fontSize: 14, color: "blue", textDecoration: "underline" },
});