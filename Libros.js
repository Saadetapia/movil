import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const images = {
  software: require("./assets/libro1.jpg"),
  agro: require("./assets/libro2.jpg"),
  visuales: require("./assets/libro3.jpg"),
  energia: require("./assets/libro4.jpg"),
  transporte: require("./assets/libro5.jpg"),
};

const Libros = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const navigation = useNavigation();
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [data, setData] = useState([
    {
      id: "1",
      title: "Ingenieria del software: un enfoque practico datos",
      author: "Roger S. Pressman",
      year: "1982",
      image: "software",
      bookAvailability: getRandomInt(0, 10),
      descripcion:
        "'Ingeniería del Software: Un Enfoque Práctico' es un libro escrito por Roger S. Pressman, uno de los autores más destacados en el campo de la ingeniería del software. La última edición del libro, la novena, fue publicada en 1982.",
    },
    {
      id: "2",
      title: "CALIDAD Y PRODUCTIVIDAD",
      author: "GUTIERREZ",
      year: "2020",
      image: "agro",
      bookAvailability: getRandomInt(0, 10),
      descripcion:
        "Con el propósito de darle justiﬁcación y fundamento a un proceso de mejora con enfoque en el cliente en este libro se analiza por qué la calidad es importante, se muestra la relación que la calidad tiene con la productividad y la competitividad, se revisan los aportes clave de varios de los expertos históricos de la calidad. Además, se exponen los aspectos más relevantes de metodologías como Seis Sigma, manufactura esbelta (lean) y los conceptos y principios de los sistemas de gestión de la calidad propuestos por las normas ISO-9000.",
    },
    {
      id: "3",
      title:
        "Creatividad, S.A.: Cómo llevar la inspiración hasta el infinito y más allá",
      author: " Ed Catmull",
      year: "2018",
      image: "visuales",
      bookAvailability: getRandomInt(0, 10),
      descripcion:
        "Las fórmulas para crear entornos creativos de la mano del fundador y presidente de Disney-Pixar Studios. Creatividad, S.A. Es un libro para profesionales que deseen llevar a sus equipos a cumbres más altas, un manual para cualquier lector que valore la originalidad y el primer viaje al centro neurálgico de Pixar Animation: a sus reuniones, sus evaluaciones de cierre de proyecto y las sesiones del Braintrust de las que nacieron algunas de las películas más exitosas de la historia del cine.",
    },
    {
      id: "4",
      title:
        "Nucleares: sí, por favor: Por qué la energía nuclear es la energía del futuro",
      author: "Manuel Fernández Ordóñez",
      year: "2023",
      image: "energia",
      bookAvailability: getRandomInt(0, 10),
      descripcion:
        "La crisis energética desatada por la guerra de Ucrania ha servido para que salieran a relucir los defectos estructurales del sistema energético europeo. La necesidad de lograr una autonomía estratégica y de reducir la dependencia de los hidrocarburos rusos ha vuelto a poner sobre la mesa a la gran olvidada en los últimos años: la energía nuclear.",
    },
    {
      id: "5",
      title: "LOGISTICA DEL TRANSPORTE Y DISTRIBUCION DE CARGA",
      author: "Luis Mora",
      year: "2013",
      image: "transporte",
      bookAvailability: getRandomInt(0, 10),
      descripcion:
        "Actualmente el tema de logística es tratado con mucha importancia, tal es así  que se le ha dado un área específica para su tratamiento. Esta actividad con el tiempo ha ido evolucionando constantemente, hasta llegar a convertirse en  una de las principales herramientas para que una empresa sea altamente competitiva. En un principio la logística no era más que tener el producto justo, en el sitio justo, en el tiempo oportuno al menor costo posible, pero hoy son parte de todo un proceso junto con otros elementos significativos para el funcionamiento de este departamento.",
    },
  ]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleBookReservation = (bookId) => {
    const selectedBook = data.find((book) => book.id === bookId);

    if (selectedBook.bookAvailability > 0) {
      const updatedData = data.map((book) => {
        if (book.id === bookId) {
          const updatedAvailability = book.bookAvailability - 1;
          return { ...book, bookAvailability: updatedAvailability };
        } else {
          return book;
        }
      });

      setData(updatedData);
      setSelectedBook(updatedData.find((book) => book.id === bookId));
      // Alert.alert("Reservación exitosa");
      navigation.navigate("Formulario");
    } else {
      Alert.alert(
        "Lo siento, no hay libros disponibles",
        "Regrese más tarde puede que ya se tengan más libros."
      );
    }
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bookItem,
        selectedBook && selectedBook.id === item.id && styles.selectedBookItem,
      ]}
      onPress={() => handleBookSelect(item)}
    >
      <Image source={images[item.image]} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookYear}>{item.year}</Text>
        <Text style={styles.bookDescription}>{item.descripcion}</Text>
        <View style={styles.bookAvailability}>
          <Text
            style={styles.bookAvailabilityText}
          >{`${item.bookAvailability} disponibles`}</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleBookReservation(item.id)}
          >
            <Text style={styles.reserveButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSelectedBook = () => {
    if (!selectedBook) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Seleccione un libro para ver los detalles
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.selectedBookContainer}>
        <Image
          source={{ uri: selectedBook.image }}
          style={styles.selectedBookImage}
        />
        <View style={styles.selectedBookDetails}>
          <Text style={styles.selectedBookTitle}>{selectedBook.title}</Text>
          <Text style={styles.selectedBookAuthor}>{selectedBook.author}</Text>
          <Text style={styles.selectedBookYear}>{selectedBook.year}</Text>
          <Text style={styles.selectedBookDescription}>
            {selectedBook.descripcion}
          </Text>
          <View style={styles.selectedBookAvailability}>
            <Text
              style={styles.selectedBookAvailabilityText}
            >{`${selectedBook.bookAvailability} disponibles`}</Text>
            <TouchableOpacity
              style={styles.selectedBookReserveButton}
              onPress={() => handleBookReservation(selectedBook.id)}
            >
              <Text style={styles.selectedBookReserveButtonText}>Reservar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderSelectedBook}
        ListHeaderComponentStyle={styles.selectedBookHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedBookItem: {
    backgroundColor: "#f2f2f2",
  },
  bookImage: {
    width: 60,
    height: 90,
    marginRight: 15,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  bookAuthor: {
    fontStyle: "italic",
    fontSize: 16,
    marginBottom: 5,
  },
  bookYear: {
    fontSize: 14,
    marginBottom: 5,
  },
  bookDescription: {},
  bookAvailability: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  bookAvailabilityText: {
    flex: 1,
  },
  reserveButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  reserveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedBookContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedBookHeader: {
    paddingBottom: 15,
  },
  selectedBookImage: {
    width: "100%",
    height: 300,
    marginBottom: 15,
  },
  selectedBookDetails: {},
  selectedBookTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  selectedBookAuthor: {
    fontStyle: "italic",
    fontSize: 20,
    marginBottom: 5,
  },
  selectedBookYear: {
    fontSize: 18,
    marginBottom: 5,
  },
  selectedBookDescription: {},
  selectedBookAvailability: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  selectedBookAvailabilityText: {
    flex: 1,
  },
  selectedBookReserveButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  selectedBookReserveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeholder: {
    padding: 15,
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default Libros;
