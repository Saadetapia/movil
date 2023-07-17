import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase";
import { useNavigation } from "@react-navigation/native";

// style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}
const InicioSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert(
        "No se llenaron todos los campos",
        "Por favor, lleno los campos"
      );
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Inicio de sesion");
          const user = userCredential.user;
          navigation.navigate("Libros");
          Alert.alert("Bienvenido" + " " + email);
        })
        .catch((error) => {
          console.log(error);
        });

      setEmail("");
      setPassword("");
  };
  const handleCreateAccount = () => {
    navigation.navigate("Nuevo Usuario");
  };
  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.titulo}>Hola</Text>
          <Text style={styles.subtitulo}>Inicia sesión en tu cuenta</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="usuaio@gmail.com"
            style={styles.text_Input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="contraseña"
            style={styles.text_Input}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={handleSignIn}
            style={styles.container_buttonInicio}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#FFB677", "#FF3CBD"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.text}>INICIAR SESION</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.contraseña}>¿No tiene cuenta?</Text>
          <TouchableOpacity
            onPress={handleCreateAccount}
            style={styles.container_buttonNuevo}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#FFB677", "#FF3CBD"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.text}>CREAR CUENTA</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
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
  contraseña: {
    fontSize: 14,
    color: "gray",
    marginTop: 20,
  },
  container_buttonInicio: {
    width: 200,
    alignItems: "center",
    marginTop: 60,
  },
  container_buttonNuevo: {
    width: 200,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default InicioSesion;
