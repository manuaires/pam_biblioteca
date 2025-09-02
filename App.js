import * as React from "react";
import { useState } from "react";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./pages/Home";
import Livros from "./pages/Livros";
import AdicionarLivro from "./pages/AdicionarLivro";
import Favoritos from "./pages/Favoritos";
import SplashScreen from "./pages/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs({ livros, setLivros, favoritos, setFavoritos }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff8f8ff" },
        tabBarActiveTintColor: "#994dcbff",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Livros") iconName = "book";
          else if (route.name === "Favoritos") iconName = "star";

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Livros"
        children={(props) => (
          <Livros
            {...props}
            livros={livros}
            setLivros={setLivros}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
          />
        )}
      />
      <Tab.Screen
        name="Favoritos"
        children={(props) => (
          <Favoritos
            {...props}
            livros={livros}
            favoritos={favoritos}
            setFavoritos={setFavoritos}
          />
        )}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [livros, setLivros] = useState([
    {
      id: "1",
      nome: "Dias Perfeitos",
      autor: "Raphael Montes",
      imagem: require("./assets/livros/diasperfeitos.jpg"),
    },
    {
      id: "2",
      nome: "Boa Garota Nunca Mais",
      autor: "Holly Jackson",
      imagem: require("./assets/livros/boagarotanuncamais.jpg"),
    },
    {
      id: "3",
      nome: "Jogos Vorazes",
      autor: "Suzanne Collins",
      imagem: require("./assets/livros/jogosvorazes.jpg"),
    },
    {
      id: "4",
      nome: "Teto para dois",
      autor: "Beth O'Leary",
      imagem: "",
    },
    {
      id: "5",
      nome: "A Filha das Profundezas",
      autor: "Rick Riordan",
      imagem: require("./assets/livros/afdp.jpg"),
    },
    {
      id: "6",
      nome: "Trono de Vidro",
      autor: "Sarah J. Maas",
      imagem: "",
    },
    {
      id: "7",
      nome: "Quem é você, Alasca?",
      autor: "John Green",
      imagem: require("./assets/livros/alaska.jpg"),
    },
    {
      id: "8",
      nome: "Jantar Secreto",
      autor: "Raphael Montes",
      imagem: require("./assets/livros/jantarsecreto.jpg"),
    },
    {
      id: "9",
      nome: "O Ladrão de Raios",
      autor: "Rick Riordan",
      imagem: require("./assets/livros/ladraoraios.jpg"),
    },
  ]);

  const [favoritos, setFavoritos] = useState([]);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tabs"
            options={{
              header: () => (
                <Appbar.Header style={{ backgroundColor: "#f9f5f5ff" }}>
                  <Appbar.Content
                    title="Biblioteca"
                    titleStyle={{ color: "#994dcbff", fontWeight: "bold" }}
                  />
                </Appbar.Header>
              ),
            }}
          >
            {(props) => (
              <Tabs
                {...props}
                livros={livros}
                setLivros={setLivros}
                favoritos={favoritos}
                setFavoritos={setFavoritos}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="AdicionarLivro"
            children={(props) => (
              <AdicionarLivro
                {...props}
                livros={livros}
                setLivros={setLivros}
              />
            )}
            options={{
              headerStyle: { backgroundColor: "#f9f5f5ff" },
              headerTintColor: "#994dcbff",
              title: "Adicionar Livro",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
