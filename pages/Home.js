import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={require("../assets/logobiblioteca.png")} // coloque sua logo dentro da pasta "assets"
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}> Bem-vindo à sua Biblioteca Particular!</Text>
      <Text style={styles.subtitle}>Liste seus livros favoritos.</Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Livros")}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        Ir para a Estante
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f5ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 170,   // ajuste o tamanho conforme necessário
    height: 170,
    marginBottom: 20,
    marginInlineEnd: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8b49b7ff",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#7b00a0ff",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8b49b7ff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
