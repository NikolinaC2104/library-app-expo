import React,
{
  useEffect,
  useState
}
from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button
}
from "react-native";

import { getBooks }
from "../services/bookService";

export default function BookListScreen({
  navigation
}: any) {

  const [books, setBooks] =
    useState([]);

  const loadBooks = async () => {
    try {
      const data =
        await getBooks();

      setBooks(data);
    } catch {
      alert(
        "Greška pri dohvaćanju"
      );
    }
  };

  useEffect(() => {

    const unsubscribe =
      navigation.addListener(
        "focus",
        loadBooks
      );

    return unsubscribe;

  }, [navigation]);

  return (
    <View style={styles.container}>

      <TouchableOpacity
  style={styles.addButton}
  onPress={() =>
    navigation.navigate("Form")
  }
>
  <Text style={styles.addButtonText}>
    + DODAJ KNJIGU
  </Text>
</TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item: any) =>
          item.id
        }
        renderItem={({ item }: any) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate("Details", {
        id: item.id
      })
    }
  >
    <Text style={styles.title}>
      {item.title}
    </Text>

    <Text>
      {item.author}
    </Text>

    <Text
  style={[
    styles.status,
    { color: item.available ? "#00896f" : "#c34a36" }
  ]}
>
  {item.available ? "✔ Dostupna" : "✖ Nije dostupna"}
</Text>

  </TouchableOpacity>
)}
      />

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fbeaff"
    },

    card: {
      backgroundColor:
        "#b39cd0",
      padding: 15,
      marginVertical: 6,
      borderRadius: 10,
      borderColor: "#845ec2"
    },

    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#280d67"
    },

    addButton: {
      backgroundColor: "#845ec2",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 15,
      elevation: 3
    },

    addButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    },

    status: {
      marginTop: 5,
      fontWeight: "600",
      color: "#280d67"
    }
    

});