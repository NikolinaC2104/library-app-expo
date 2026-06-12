import axios from "axios";

const API = axios.create({
  baseURL:
    "https://6a2c0db43e2b60ab038f5c70.mockapi.io/api/v1"
});

export default API;

export const getBooks = async () => {
  const response =
    await API.get("/books");

  return response.data;
};

export const getBook = async (
  id: string
) => {
  const response =
    await API.get(`/books/${id}`);

  return response.data;
};

export const createBook = async (
  book: any
) => {
  const response =
    await API.post(
      "/books",
      book
    );

  return response.data;
};

export const updateBook = async (
  id: string,
  book: any
) => {

  const response =
    await API.put(
      `/books/${id}`,
      book
    );

  return response.data;
};

export const deleteBook = async (
  id: string
) => {

  await API.delete(
    `/books/${id}`
  );
};