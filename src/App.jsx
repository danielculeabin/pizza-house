import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import { createContext } from 'react';

import './scss/app.scss';

function App() {
  const SearchContext = createContext();
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <div className="wrapper">
        {/*Повесили правило на стену для всех - все могут воспользоваться глобальной переменной*/}
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id/:string" element={<FullPizza />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
