import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string; //? typescript
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://67e4411b2ae442db76d3b37f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error happened while receiving the pizzas!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  // Если будет 'undefined' тогда рендерь загрузку
  if (!pizza) {
    return <>Loading...</>;
  }

  // Проверку выше сделали, теперь jsx разметка может рендериться спокойно потому что онa берёт данные из объекта а не из потенциального сценария "undefined"
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>Title: {pizza.title}</h2>
      <h4>Price: {pizza.price}$</h4>
    </div>
  );
};

export default FullPizza;
