import { ScrollView, StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/Card";
import Spacer from "../../components/Spacer";
import { useNavigation } from "@react-navigation/native";

const VENDOR_LIST = [
  {
    name: "John Doe",
    business: "John Doe's Pizza Stalls",
    address: "Rizal Street, Naga City",
    contact: "09123456789",
    email: "johndoe@example.com",
    products: "Pizzas",
  },
  {
    name: "Jane Smith",
    business: "Smith's Sushi",
    address: "Magsaysay Ave, Naga City",
    contact: "09987654321",
    email: "janesmith@example.com",
    products: "Sushi",
  },
  {
    name: "Carlos Reyes",
    business: "Reyes BBQ",
    address: "Peñafrancia St, Naga City",
    contact: "09234567890",
    email: "carlosreyes@example.com",
    products: "Barbecue",
  },
  {
    name: "Ana Cruz",
    business: "Ana's Fresh Juices",
    address: "Diversion Road, Naga City",
    contact: "09456789012",
    email: "anacruz@example.com",
    products: "Fruit Juices",
  },
  {
    name: "Mike Tan",
    business: "Tan's Noodles",
    address: "Liboton Street, Naga City",
    contact: "09012345678",
    email: "miket@example.com",
    products: "Noodles",
  },
  {
    name: "Liza Gomez",
    business: "Gomez Pastries",
    address: "Centro, Naga City",
    contact: "09321098765",
    email: "lizag@example.com",
    products: "Pastries",
  },
];

export default function Vendors() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const filteredVendors = VENDOR_LIST.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(query.toLowerCase()) ||
      vendor.products.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search vendors by name or product..."
        value={query}
        onChangeText={setQuery}
      />
      {filteredVendors.map((vendor, idx) => (
        <Card key={vendor.email || idx} style={styles.card}>
          <CardHeader>
            <CardTitle>{vendor.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{vendor.business}</CardDescription>
            <CardDescription>{vendor.address}</CardDescription>
            <Spacer />
            <CardDescription style={styles.label}>Contact No:</CardDescription>
            <CardDescription>{vendor.contact}</CardDescription>
            <Spacer />
            <CardDescription style={styles.label}>Email:</CardDescription>
            <CardDescription>{vendor.email}</CardDescription>
            <Spacer />
            <CardDescription style={styles.label}>Products:</CardDescription>
            <CardDescription>{vendor.products}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: "#D6F5FF",
  },
  card: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
