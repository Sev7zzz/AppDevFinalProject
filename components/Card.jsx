import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = forwardRef(function Card({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.card, style]} {...props} />;
});

const CardHeader = forwardRef(function CardHeader({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.header, style]} {...props} />;
});

const CardTitle = forwardRef(function CardTitle(
  { style, children, ...props },
  ref
) {
  return (
    <Text ref={ref} style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
});

const CardContent = forwardRef(function CardContent({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.content, style]} {...props} />;
});

const CardDescription = forwardRef(function CardDescription(
  { style, children, ...props },
  ref
) {
  return (
    <Text ref={ref} style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
});

const CardFooter = forwardRef(function CardFooter({ style, ...props }, ref) {
  return <View ref={ref} style={[styles.footer, style]} {...props} />;
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
