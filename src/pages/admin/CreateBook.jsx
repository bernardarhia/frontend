import { useState } from "react";
import Button from "../../common/Button";
import ErrorDisplay from "../../common/ErrorDisplay";
import SuccessDisplay from "../../common/SuccessDisplay";
import HeaderText from "../../common/HeaderText";
import Input from "../../common/Input";
import Container from "../../components/Container";
import Header from "../../components/Header";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CreateBook = () => {
  const CREATE_URL = "/books/create";
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length < 1 || !title) {
      return setError(["Title required"]);
    }
    if (price.length < 1 || !title || price < 0) {
      return setError(["Empty or invalid price value"]);
    }
    if (quantity.length < 1 || !quantity || quantity < 1) {
      return setError(["Empty or invalid quantity value"]);
    }
    if (description.length < 1 || !description) {
      return setError(["Description required"]);
    }

    setError([]);
    try {
      const response = await axiosPrivate.post(CREATE_URL, {
        title,
        price,
        quantity,
        description,
      });
      if (response?.data) {
        setTitle("");
        setPrice(0);
        setQuantity(1);
        setDescription("");
        setSuccess(true);
      }

      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <Container>
      <Header />
      <HeaderText>Book creation</HeaderText>
      <form className="book-form" onSubmit={handleSubmit}>
        <HeaderText>Enter book details</HeaderText>
        <ErrorDisplay error={error} />
        {success && (
          <SuccessDisplay
            success={success}
            successMessage="Book created successfully"
          />
        )}
        <div className="input-container">
          <label htmlFor="title">Book title</label>
          <Input
            className="input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Book price</label>
          <Input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="quantity">Book quantity</label>
          <Input
            className="input"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Book title</label>
          <textarea
            className="input"
            type="text"
            id="description"
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="button-container">
          <Button disabled={isLoading}>
            {isLoading ? "Loading...." : "Create"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateBook;
