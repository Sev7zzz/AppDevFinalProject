import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/Card";
import Spacer from "../../components/Spacer";

const mockData = [
  {
    id: "1",
    name: "John Doe",
    business: "John Doe's Pizza Stalls",
    address: "Rizal Street, Naga City",
    amount: "$40",
    reference: "RC250602001",
    date: "6/2/2025 - 3:46:44 PM",
    dateRaw: new Date("2025-06-02T15:46:44"),
  },
  {
    id: "2",
    name: "Jane Smith",
    business: "Jane's Coffee",
    address: "Quezon Avenue, Naga City",
    amount: "$25",
    reference: "RC250602002",
    date: "6/1/2025 - 1:12:20 PM",
    dateRaw: new Date("2025-06-01T13:12:20"),
  },
  {
    id: "3",
    name: "John Doe",
    business: "John Doe's Pizza Stalls",
    address: "Rizal Street, Naga City",
    amount: "$60",
    reference: "RC250602003",
    date: "6/1/2025 - 5:30:10 PM",
    dateRaw: new Date("2025-06-01T17:30:10"),
  },
];

export default function History() {
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState(new Date("2025-06-01"));
  const [endDate, setEndDate] = useState(new Date("2025-06-30"));
  const [sortOption, setSortOption] = useState("date_desc");
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const filteredData = mockData
    .filter((item) => {
      const matchText =
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.business.toLowerCase().includes(filter.toLowerCase()) ||
        item.reference.toLowerCase().includes(filter.toLowerCase());
      const dateMatch = item.dateRaw >= startDate && item.dateRaw <= endDate;
      return matchText && dateMatch;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "date_asc":
          return a.dateRaw - b.dateRaw;
        case "date_desc":
          return b.dateRaw - a.dateRaw;
        case "amount_asc":
          return parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1));
        case "amount_desc":
          return parseFloat(b.amount.slice(1)) - parseFloat(a.amount.slice(1));
        default:
          return 0;
      }
    });

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{item.business}</CardDescription>
        <CardDescription>{item.address}</CardDescription>
        <Spacer />
        <CardDescription style={styles.label}>Amount Paid:</CardDescription>
        <CardDescription>{item.amount}</CardDescription>
        <Spacer />
        <CardDescription style={styles.label}>Reference No:</CardDescription>
        <CardDescription>{item.reference}</CardDescription>
        <Spacer />
        <CardDescription style={styles.label}>Date & Time:</CardDescription>
        <CardDescription>{item.date}</CardDescription>
      </CardContent>
    </Card>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name, business, or reference"
        value={filter}
        onChangeText={setFilter}
      />
      <View style={styles.datePickerRow}>
        <Text onPress={() => setShowStart(true)} style={styles.dateButton}>
          Start: {startDate.toISOString().slice(0, 10)}
        </Text>
        <Text onPress={() => setShowEnd(true)} style={styles.dateButton}>
          End: {endDate.toISOString().slice(0, 10)}
        </Text>
      </View>
      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStart(Platform.OS === "ios");
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}
      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEnd(Platform.OS === "ios");
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}
      <Picker
        selectedValue={sortOption}
        style={styles.picker}
        onValueChange={(itemValue) => setSortOption(itemValue)}
      >
        <Picker.Item label="Date (Newest First)" value="date_desc" />
        <Picker.Item label="Date (Oldest First)" value="date_asc" />
        <Picker.Item label="Amount (High to Low)" value="amount_desc" />
        <Picker.Item label="Amount (Low to High)" value="amount_asc" />
      </Picker>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#D6F5FF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "48%",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  picker: {
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
  },
});
