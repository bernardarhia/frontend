import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
const useBooks = () => {
  const [books, setBooks] = useState();

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axiosPrivate.get("/books", {
          signal: controller.signal,
        });
        isMounted && setBooks(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();

    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  return {books}
};

export default useBooks;
