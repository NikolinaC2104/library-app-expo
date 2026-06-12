import React,
{
  useState
}
from "react";

import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet
}
from "react-native";

import {
  createBook,
  updateBook
}
from "../services/bookService";

export default function
BookFormScreen({
  route,
  navigation
}: any) {

  const existingBook =
    route.params?.book;

  const [title,
    setTitle] =
      useState(
        existingBook?.title || ""
      );

  const [author,
    setAuthor] =
      useState(
        existingBook?.author || ""
      );

  const [isbn,
    setIsbn] =
      useState(
        existingBook?.isbn || ""
      );

  const [publishedYear,
    setPublishedYear] =
      useState(
        existingBook
          ?.publishedYear
          ?.toString() || ""
      );

  const [available, setAvailable] = useState(
  existingBook?.available ?? true
);

  const saveBook =
    async () => {

      if (!title.trim()) {
        alert(
          "Naslov je obavezan"
        );
        return;
      }

      const book = {

        title,
        author,
        isbn,

        publishedYear:
          Number(
            publishedYear
          ),

        available
      };

      if (existingBook) {

        await updateBook(
          existingBook.id,
          book
        );

      } else {

        await createBook(book);
      }

      navigation.goBack();
    };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Naslov"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Autor"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />

      <TextInput
        placeholder="ISBN"
        value={isbn}
        onChangeText={setIsbn}
        style={styles.input}
      />

      <TextInput
        placeholder="Godina"
        keyboardType="numeric"
        value={publishedYear}
        onChangeText={
          setPublishedYear
        }
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>
          Dostupnost knjige
        </Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {available
              ? "Dostupna"
              : "Nije dostupna"}
          </Text>

          <Switch
            value={available}
            onValueChange={setAvailable}
          />
        </View>
      </View>

      <TouchableOpacity
          style={styles.saveButton}
          onPress={saveBook}
        >
          <Text style={styles.saveButtonText}>
            SPREMI KNJIGU
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
      backgroundColor: "#fbeaff"
    },

    input: {
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 8,
      backgroundColor: "#b39cd0"
    },

switchContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginVertical: 15
},

label: {
  fontSize: 16,
  fontWeight: "500"
},

statusContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10
},

statusText: {
  fontSize: 15
},

saveButton: {
  backgroundColor: "#845ec2",
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20,
  elevation: 3
},

saveButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold"
}

});