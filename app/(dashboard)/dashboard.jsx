import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/Card";
import ThemedButton from "../../components/ThemedButton";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.titleRow}>
                <Feather name="dollar-sign" size={15} color="#4CAE4F" />
                <Text style={[styles.titleText, { color: "#4CAE4F" }]}>
                  Collected
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.collected}>$12,345</Text>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.titleRow}>
                <MaterialIcons name="error-outline" size={15} color="#F23F34" />
                <Text style={[styles.titleText, { color: "#F23F34" }]}>
                  Missing
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.missing}>$50,000</Text>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.titleRow}>
                <Ionicons name="people-outline" size={15} color="#4B94F3" />
                <Text style={[styles.titleText, { color: "#4B94F3" }]}>
                  Vendors Paid
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.vendors}>10/50</Text>
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>
              <View style={styles.titleRow}>
                <Feather name="clock" size={15} color="#EA8D0B" />
                <Text style={[styles.titleText, { color: "#EA8D0B" }]}>
                  Pending
                </Text>
              </View>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.pending}>40/50</Text>
          </CardContent>
        </Card>
      </View>
      <Text>Quick Actions</Text>
      <ThemedButton>
        <View style={styles.titleRow}>
          <Feather name="dollar-sign" size={15} color="white" />
          <Text
            style={[styles.titleText, { color: "#f2f2f2", fontWeight: "600" }]}
          >
            Add Payment
          </Text>
        </View>
      </ThemedButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#D6F5FF",
    flexGrow: 1,
  },
  card: {
    marginBottom: 5,
    width: "49%",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
    fontWeight: "600",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "10px",
    justifyContent: "space-around",
  },
  collected: {
    color: "#4CAE4F",
    fontSize: 18,
    fontWeight: "600",
  },
  missing: {
    color: "#F23F34",
    fontSize: 18,
    fontWeight: "600",
  },
  vendors: {
    color: "#4B94F3",
    fontSize: 18,
    fontWeight: "600",
  },
  pending: {
    color: "#EA8D0B",
    fontSize: 18,
    fontWeight: "600",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 16,
  },
});
