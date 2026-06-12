import React,
{
  useEffect,
  useState
}
from "react";

import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity
}
from "react-native";

import {
  getBook,
  deleteBook
}
from "../services/bookService";

export default function
BookDetailsScreen({
  route,
  navigation
}: any) {

  const [book, setBook] =
    useState<any>();

  const id =
    route.params.id;

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const data =
      await getBook(id);

    setBook(data);
  };

  const handleDelete = () => {

    Alert.alert(
      "Brisanje",
      "Obrisati knjigu?",
      [
        {
          text: "Ne"
        },
        {
          text: "Da",
          onPress: async () => {

            await deleteBook(id);

            navigation.navigate(
              "Books"
            );
          }
        }
      ]
    );
  };

  if (!book) return null;

  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
        Naslov:
      </Text>

        <Text>
          {book.title}
        </Text>

      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
        Autor:
      </Text>

        <Text>
          {book.author}
        </Text>

      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
        ISBN: 
      </Text>

        <Text>
          {book.isbn}
        </Text>

      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
        Godina:
      </Text>

        <Text>
          {book.publishedYear}
        </Text>

      <Text style={{ fontWeight: "bold", fontSize: 15 }}>
        Dostupna:
      </Text>

        <Text>
          {book.available
            ? " DA"
            : " NE"}
        </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate(
            "Form",
            {
              book
            }
          )
        }
      >
        <Text style={styles.buttonText}>
          UREDI
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>
          OBRIŠI
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
      gap: 15,
      backgroundColor: "#fbeaff"
    },

    editButton: {
      backgroundColor: "#845ec2",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 20
    },

    deleteButton: {
      backgroundColor: "#c34a36",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center"
    },

    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold"
    }

});