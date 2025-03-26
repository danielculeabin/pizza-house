import React from 'react';
import Header from '/src/components/Header';
import Categories from '/src/components/Categories';
import Sort from '/src/components/Sort';
import PizzaBlock from './components/PizzaBlock';

import pizza from './assets/pizza.json';

import './scss/app.scss';

/**
|--------------------------------------------------
| 1)Компоненты передаются в JSX следующим образом либо так <Component/> или либо так {Component()} 
  
  2)Господа погромисты предпочитают вызывать функциональный компонент в виде тэга HTML <component/>
  Так красивее. vx
|--------------------------------------------------
*/
function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All Pizzas</h2>
            <div className="content__items">
              {pizza.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
