import React, { useState } from "react";
import { Alert, Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

const Aviso = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();

  function handleBlockNavigation() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Inicio Sesion" }],
    });
    Alert.alert("Acepto los terminos", "Bienvenido.");
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <Text>
          {" "}
          La aplicación para que funcione de forma correcta debe de conectarse a
          internet ¿Acepta que la app se conecte a internet?
        </Text>
        <Text> ¿Acepta que la app se conecte a internet?</Text>
        <Button title="Aceptar" onPress={handleBlockNavigation} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Aviso;
