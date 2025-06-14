import React, { useState, createContext } from 'react'; // React и хуки
import { Routes, Route } from 'react-router-dom'; // Для роутинга
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import './scss/app.scss';

// *** ВОТ ИСПРАВЛЕНИЕ ***
// Добавляем дефолтное значение для createContext
export const SearchContext = createContext({
  searchValue: '',// Дефолтное значение для searchValue
  setSearchValue: (value: string) => {},// Пустая функция для setSearchValue
});

function App() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
