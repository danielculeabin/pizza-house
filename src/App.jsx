import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';

import './scss/app.scss';

export const SearchContext = React.createContext(); // Создали правило - глобальную переменную

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const path = window.location.pathname;

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
