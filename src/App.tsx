import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

export const SearchContext = React.createContext({
  searchValue: '',
  setSearchValue: (value: string) => {},
});

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="cart"
            element={
              <React.Suspense fallback={<div>Loading Cart...</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <React.Suspense fallback={<div>Loading Pizza...</div>}>
                <FullPizza />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <NotFound />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
