import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Feather from "@expo/vector-icons/Feather";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../../components/Card";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";

const mockVendorDB = {
  12345: {
    name: "John Doe",
    business: "John Doe's Pizza Stalls",
    address: "Rizal Street, Naga City",
    contact: "09123456789",
    email: "johndoe@example.com",
    products: "Pizzas",
  },
  67890: {
    name: "Jane Smith",
    business: "Jane's Coffee",
    address: "Quezon Avenue, Naga City",
    contact: "09987654321",
    email: "jane@example.com",
    products: "Coffee & Pastries",
  },
  11223: {
    name: "Carlos Reyes",
    business: "Carlos Electronics",
    address: "Magsaysay Ave, Naga City",
    contact: "09112233445",
    email: "carlos@example.com",
    products: "Electronics",
  },
};

export default function Payment() {
  const [vendorId, setVendorId] = useState("");
  const [vendor, setVendor] = useState(null);
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setVendorId("");
    setVendor(null);
    setAmount("");
    setReceipt(null);
  };

  const handleSearchVendor = () => {
    if (!vendorId.trim()) {
      Alert.alert("Input Error", "Please enter a vendor ID.");
      return;
    }
    const found = mockVendorDB[vendorId.trim()];
    if (found) {
      setVendor(found);
      setReceipt(null);
    } else {
      Alert.alert("Vendor not found", "No vendor matches this ID.");
      setVendor(null);
    }
  };

  const handleSubmitPayment = () => {
    if (!vendor) return;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert("Input Error", "Please enter a valid payment amount.");
      return;
    }
    const refNo = `RC${Date.now()}`;
    const timestamp = new Date().toLocaleString();
    setReceipt({
      vendor: vendor.name,
      amount: amountNum.toFixed(2),
      refNo,
      time: timestamp,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <View style={styles.fullContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Vendor ID</Text>
        <TextInput
          value={vendorId}
          onChangeText={setVendorId}
          placeholder="Enter Vendor ID"
          style={styles.input}
          onSubmitEditing={handleSearchVendor}
        />

        <Text>Select Vendor</Text>
        <Picker
          selectedValue={vendorId}
          onValueChange={(itemValue) => setVendorId(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="-- Choose Vendor --" value="" />
          {Object.entries(mockVendorDB).map(([id, v]) => (
            <Picker.Item key={id} label={`${v.name} (${id})`} value={id} />
          ))}
        </Picker>

        <ThemedButton onPress={handleSearchVendor}>
          <View style={styles.titleRow}>
            <Feather name="search" size={15} color="white" />
            <Text style={styles.buttonText}>Search Vendor</Text>
          </View>
        </ThemedButton>

        {vendor && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{vendor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{vendor.business}</CardDescription>
                <CardDescription>{vendor.address}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>
                  Contact No:
                </CardDescription>
                <CardDescription>{vendor.contact}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>Email:</CardDescription>
                <CardDescription>{vendor.email}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>
                  Products:
                </CardDescription>
                <CardDescription>{vendor.products}</CardDescription>
              </CardContent>
            </Card>

            <Text>Payment Amount</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              style={styles.input}
            />
            <ThemedButton onPress={handleSubmitPayment}>
              <View style={styles.titleRow}>
                <Feather name="dollar-sign" size={15} color="white" />
                <Text style={styles.buttonText}>Process Payment</Text>
              </View>
            </ThemedButton>
          </>
        )}
      </ScrollView>

      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Received</CardTitle>
                <Text>Digital Receipt has been generated</Text>
              </CardHeader>
              <CardContent>
                <CardDescription style={styles.label}>Vendor:</CardDescription>
                <CardDescription>{receipt?.vendor}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>
                  Amount Paid:
                </CardDescription>
                <CardDescription>${receipt?.amount}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>
                  Reference No:
                </CardDescription>
                <CardDescription>{receipt?.refNo}</CardDescription>
                <Spacer />
                <CardDescription style={styles.label}>
                  Date & Time:
                </CardDescription>
                <CardDescription>{receipt?.time}</CardDescription>
              </CardContent>
              <CardFooter>
                <Pressable
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </CardFooter>
            </Card>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#D6F5FF",
  },
  container: {
    padding: 16,
    alignItems: "stretch",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 6,
  },
  label: {
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderRadius: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#333",
    alignItems: "center",
    borderRadius: 6,
  },
});
