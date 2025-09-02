import React from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import { Card, IconButton } from "react-native-paper";

export default function Favoritos({ livros, favoritos, setFavoritos }) {
  const favoritosLivros = livros.filter((livro) =>
    favoritos.includes(livro.id)
  );

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((fid) => fid !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ Favoritos</Text>
      {favoritosLivros.length === 0 ? (
        <Text style={{ textAlign: "center", color: "#888" }}>Nenhum livro favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favoritosLivros}
          keyExtractor={(item) => item.id}
          numColumns={2} // 👉 dois livros por linha
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}        
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Image
                source={
                  // se for uma string válida (não vazia)
                  typeof item.imagem === "string" && item.imagem.trim() !== ""
                    ? { uri: item.imagem }
                    // se for um require (número)
                    : typeof item.imagem === "number"
                    ? item.imagem
                    // caso contrário, placeholder
                    : require("../assets/livros/placeholder.jpg")
                }
                style={styles.imagem}
              />

              <Card.Content>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.autor}>{item.autor}</Text>
              </Card.Content>
             <View style={styles.acoes}>
              <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                <IconButton
                  icon={favoritos.includes(item.id) ? "star" : "star-outline"}
                  iconColor="#FFD700"
                  size={30} // ajuste o tamanho se quiser
                  onPress={() => toggleFavorito(item.id)}
                />
              </View>
            </View>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f5f5ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8b49b7ff",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    backgroundColor: "#ede8efff",
    borderRadius: 10,
    overflow: "hidden",
    width: "47%",
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 3,
  },
  imagem: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#763a9fff",
    textAlign: "center",
    marginTop: 10,
  },
  autor: {
    fontSize: 14,
    color: "#8e4aa5ff",
    textAlign: "center",
    marginBottom: 2,
  },
  acoes: {
  marginBottom: 5,
  marginTop: 3,
  },
});