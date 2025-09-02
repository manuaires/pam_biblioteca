import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function AdicionarLivro({ route, navigation, livros, setLivros }) {
  const { editar } = route.params || {};

  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (editar) {
      setNome(editar.nome);
      setAutor (editar.autor);
      setImagem(editar.imagem);
    }
  }, [editar]);

  
  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Conceda acesso à galeria para escolher uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const salvarLivro = () => {
    if (nome.trim() === "" ||autor.trim() === "") {
      Alert.alert("Atenção", "Preencha o nome e o autor.");
      return;
    }

    if (editar) {
      // edita
      setLivros(
        livros.map((p) =>
          p.id === editar.id ? { ...p, nome: nome, autor: autor, imagem: imagem } : p
        )
      );
    } else {
      // adiciona
      setLivros([
        ...livros,
        { id: Date.now().toString(), nome: nome, autor: autor, imagem: imagem || null},
      ]);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editar ? "✏️ Editar Livro" : "➕ Novo Livro"}</Text>

      <TextInput
        mode="outlined"
        label="Nome do Livro"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#994dcbff" },
        }}
        textColor="#4b4b4bff"
      />

      <TextInput
        mode="outlined"
        label="Nome do Autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
        theme={{
          colors: { text: "#fff", placeholder: "#fff", primary: "#994dcbff" },
        }}
        textColor="#4b4b4bff"
      />

        <TouchableOpacity style={styles.imgPicker} onPress={escolherImagem}>
        {imagem && typeof imagem === "string" && imagem.length > 0 ? (
          <Image source={{ uri: imagem }} style={styles.preview} />
        ) : (
          <Text style={styles.chooseText}>📷 Escolher imagem</Text>
        )}

        </TouchableOpacity>

      <Button
        mode="contained"
        onPress={salvarLivro}
        style={styles.button}
        labelStyle={{ text: "#fff",color: "#ffffffff", fontWeight: "bold" }}
      >
        {editar ? "Salvar Alterações" : "Adicionar Livro"}
        
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  
  chooseText: {
    position: "absolute",
    color: "#994dcbff",
    fontWeight: "bold",
    alignSelf: "center",
    bottom: 10,
    backgroundColor: "#fff8f8ff",
    paddingHorizontal: 8,
    borderRadius: 4,
    },
 container: {
    flex: 1,
    backgroundColor: "#fff8f8ff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8b49b7ff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#ede8efff",
  },
  imgPicker: {
    backgroundColor: "#ede8efff",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#757575ff",
  },
  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#8b49b7ff",
    marginTop: 10,
  },
});
