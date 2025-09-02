import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
 
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Tabs");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);
 
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logobiblioteca.png")} style={styles.logo} />
      <Text style={styles.title}>Biblioteca</Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f5ff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    marginInlineEnd: 20,
    resizeMode: "contain",
  },
  title: {
    color: "#8b49b7ff",
    fontSize: 28,
    fontWeight: "bold",
  },
});