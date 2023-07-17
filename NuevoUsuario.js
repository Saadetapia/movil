import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase";
import { useNavigation } from "@react-navigation/native";

const NuevoUsuario = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirPassword] = useState("");
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos del formulario."
      );
      return;
    } else {
      if (password !== confirmPassword) {
        Alert.alert("Error", "La contraseña no coincide");
        return;
      } else {
        if (password.length >= 6 && confirmPassword.length >= 6) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log("Cuenta creada");
              const user = userCredential.user;
              console.log(user);
              navigation.navigate("Inicio Sesion");
              Alert.alert(
                "Registro exitoso",
                "Tu cuenta ha sido creada exitosamente."
              );
              // Borramos los campos del formulario
              setUsername("");
              setEmail("");
              setPassword("");
              setConfirPassword("");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Alert.alert(
            "Error",
            "La contraseña debe de ser mayor a 6 caracteres."
          );
        }
      }
    }

    console.log(
      `Registrando usuario: ${username}, correo electrónico: ${email}, contraseña: ${password}, confirmar contraseña: ${confirmPassword}`
    );
  };

  const handleCancel = () => {
    // Borramos los campos del formulario
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirPassword("");

    // Mostramos una alerta para confirmar el cancelamiento
    Alert.alert("Cancelado", "El registro ha sido cancelado.");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          // onChangeText={(text) => setUsername(text)}
          placeholder="Ingresa tu nombre de usuario"
          style={styles.input}
        />
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          // onChangeText={(text) => setEmail(text)}
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          style={styles.input}
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          //onChangeText={(text) => setPassword(text)}
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          style={styles.input}
        />
        <Text style={styles.label}>Confirmar contraseña:</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirPassword}
          //onChangeText={(text) => setConfirPassword(text)}
          placeholder="confirme su contraseña"
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  button: {
    backgroundColor: "#007AFF",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#C36262",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NuevoUsuario;
