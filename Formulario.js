import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const Formulario = () => {
  const [folio, setFolio] = useState("");
  const [nombreSolicitante, setNombreSolicitante] = useState("");
  const [matricula, setMatricula] = useState("");
  const [ingenieria, setIngenieria] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [estudiante, setEstudiante] = useState("");
  const [ptc, setPtc] = useState("");
  const [pa, setPa] = useState("");
  const [selectedValue, setSelectedValue] = useState("0");
  const navigation = useNavigation();

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };
  const handleSubmit = () => {
    if (
      !folio ||
      !nombreSolicitante ||
      !matricula ||
      !cuatrimestre ||
      !estudiante ||
      !ptc ||
      !pa ||
      !selectedValue
    ) {
      Alert.alert(
        "No se llenaron todos los campos",
        "Por favor, lleno los campos"
      );
      return;
    } else {
      if (selectedValue === "0") {
        Alert.alert(
          "No se seleciono ninguna carrera",
          "Por favor, selecione una carrera"
        );
        return;
      }
      const solicitud = {
        folio,
        nombreSolicitante,
        matricula,
        ingenieria,
        cuatrimestre,
        estudiante,
        ptc,
        pa,
        radioButtons,
      };
      // Enviar solicitud al servidor o almacenar localmente
      Alert.alert("Reservación exitosa");
      console.log(solicitud) + `Selected value: ${selectedValue}`;
      navigation.navigate("Libros");

    }
  };

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Matutino",
      value: "1",
    },
    {
      id: "2",
      label: "Vespertino",
      value: "2",
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.label}>Folio:</Text>
            <TextInput
              style={styles.input}
              value={folio}
              onChangeText={setFolio}
            />
          </View>
          <View style={styles.rowNombreUsuario}>
            <Text style={[styles.label, styles.nombreLabel]}>
              Nombre del solicitante:
            </Text>
            <TextInput
              style={[styles.input, styles.nombreInput]}
              value={nombreSolicitante}
              onChangeText={setNombreSolicitante}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Matrícula:</Text>
            <TextInput
              style={styles.input}
              value={matricula}
              onChangeText={setMatricula}
            />
          </View>
          <View>
            <Text style={styles.label}>Ingeniería:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
              >
                <Picker.Item label="Choose..." value="0" />
                <Picker.Item label="Ingeniería Agroindustrial" value="1" />
                <Picker.Item label="Ingeniería de Software" value="2" />
                <Picker.Item
                  label="Ingeniería en Animación y Efectos Visuales"
                  value="3"
                />
                <Picker.Item label="Ingeniería en Energía" value="4" />
                <Picker.Item
                  label="Ingeniería en Logística y Transporte"
                  value="5"
                />
                <Picker.Item label="Ingeniería en Nanotecnología" value="6" />
                <Picker.Item
                  label="Ingeniería en Sistemas Automotrices"
                  value="7"
                />
                <Picker.Item
                  label="Ingeniería en Tecnología Ambiental"
                  value="8"
                />
                <Picker.Item label="Ingeniería Financiera" value="9" />
                <Picker.Item label="Ingeniería Mecatrónica" value="10" />
              </Picker>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Cuatrimestre:</Text>
            <TextInput
              style={styles.input}
              value={cuatrimestre}
              onChangeText={setCuatrimestre}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estudiante:</Text>
            <TextInput
              style={styles.input}
              value={estudiante}
              onChangeText={setEstudiante}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Turno:</Text>
            <View>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                style={styles.row}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PTC:</Text>
            <TextInput style={styles.input} value={ptc} onChangeText={setPtc} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>PA:</Text>
            <TextInput style={styles.input} value={pa} onChangeText={setPa} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar solicitud</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  rowNombreUsuario: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 1,
    fontSize: 16,
    width: "100%",
    flex: 1,
  },
  nombreLabel: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginRight: 5,
  },
  nombreInput: {
    flex: 1,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
  },
});

export default Formulario;
