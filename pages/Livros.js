import React, { useState } from "react";
import { View, StyleSheet, FlatList, Image, Alert } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";


export default function Livros({ navigation, livros, setLivros, favoritos, setFavoritos }) {

const [pagina, setPagina] = useState(1);
  const itensPorPagina = 6;

  const totalPaginas = Math.ceil(livros.length / itensPorPagina);
  const livrosPaginados = livros.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  const excluirLivro = (id) => {
    Alert.alert("Confirmar exclusão", "Deseja realmente excluir este livro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setLivros(livros.filter((p) => p.id !== id)),
      },
    ]);
  };

    const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((fid) => fid !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Livros</Text>

      <FlatList
        data={livrosPaginados}
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
              <IconButton
                icon="pencil"
                iconColor="#994dcbff"
                onPress={() =>
                  navigation.navigate("AdicionarLivro", {
                    editar: item,
                  })
                }
              />
              <IconButton
                icon="delete"
                iconColor="#d23f3fff"
                onPress={() => excluirLivro(item.id)}
              />
              <IconButton
                icon={favoritos.includes(item.id) ? "star" : "star-outline"}
                iconColor="#FFD700"
                onPress={() => toggleFavorito(item.id)}
              />
            </View>
          </Card>
        )}
        ListFooterComponent={
          <View style={styles.pagination}>
            <Button
              icon="chevron-left"
              disabled={pagina === 1}
              onPress={() => setPagina(pagina - 1)}
              style={styles.pageBtn}
              labelStyle={{ color: "#8b49b7ff", fontSize: 30, fontWeight: "bold" }}
            >
            </Button>
            <Button
              icon="chevron-right"
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onPress={() => setPagina(pagina + 1)}
              style={styles.pageBtn}
              labelStyle={{ color: "#8b49b7ff", fontSize: 30, fontWeight: "bold" }}
            >
            </Button>
            <Text style={{ color: "#8b49b7ff", marginHorizontal: 10, textAlign: "center" }}>
              Página {pagina} de {totalPaginas}
            </Text>
          </View>
        }
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdicionarLivro")}
        style={styles.button}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        ➕ Adicionar Livro
      </Button>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#8b49b7ff",
    marginBottom: 15,
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
    marginBottom: 5,
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#8b49b7ff",
    marginTop: 10,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
