import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicioSesion from "./InicioSesion";
import Libros from "./Libros";
import NuevoUsuario from "./NuevoUsuario";
import Aviso from "./Aviso";
import Formulario from "./Formulario";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Aviso" component={Aviso} />
      <Stack.Screen name="Inicio Sesion" component={InicioSesion} />
      <Stack.Screen name="Nuevo Usuario" component={NuevoUsuario} /> 
      <Stack.Screen name="Libros" component={Libros} />
      <Stack.Screen name="Formulario" component={Formulario} /> 
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#f1f1f1",
    flex: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerSvg: {
    width: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titulo: {
    fontSize: 80,
    color: "#34434D",
    fontWeight: "bold",
  },
  subtitulo: {
    fontSize: 20,
    color: "gray",
  },
  text_Input: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});
