// index.jsx
import {
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Text,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedLogo from "../components/ThemedLogo";
import Spacer from "../components/Spacer";
import ThemedButton from "../components/ThemedButton";

const Home = () => {
  const router = useRouter();
  const handleLogin = () => {
    Alert.alert("Login Successful", "Welcome to NagaStall", [
      { text: "OK", onPress: () => router.push("/dashboard") },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer />

      <ThemedText style={styles.title} title={true}>
        Naga Stall Management System
      </ThemedText>

      <ThemedText style={styles.subtitle}>Powered by: DigiStall</ThemedText>

      <TextInput
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <ThemedButton onPress={handleLogin} style={{ width: "100%" }}>
        <Text style={styles.loginText}>Login</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
