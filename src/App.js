import React, { useState } from 'react';
import Pizzas from './components/Pizzas';
import NewPizza from './components/NewPizza';

function App() {

  // array of existing pizzas
  const [pizzas, setPizzas] = useState([]);

  // save new pizza
  const saveCallback = (pizza) => setPizzas(pizzas => [...pizzas, pizza]);

  // delete pizza
  const deleteCallback = (pizza) => setPizzas(pizzas.filter(item => item.id !== pizza.id));

  // edit existing pizza
  const editCallback = (pizza) => {
    let pizzaArray = [...pizzas];
    let pizzaIndex = pizzaArray.findIndex((obj => obj.id == pizza.id));
    pizzaArray[pizzaIndex] = pizza;
    setPizzas(pizzaArray);
  };

  // check if duplicate pizza already exists
  window.pizzaExists = (pizza) => {
    for (let i = 0; i < pizzas.length; i++) {
      if (
        pizzas[i].size == pizza.size &&
        pizzas[i].toppings.map((e) => e.title).sort().toString() == pizza.toppings.map((e) => e.title).sort().toString() &&
        pizzas[i].id !== pizza.id
      )
        return true;
    }
    return false;
  }

  // render the app components
  return (
    <div className='App'>
      <header>
        <h1>Welcome to Pizza Palace</h1>
      </header>
      <NewPizza saveCallback={saveCallback} />
      <Pizzas
        pizzas={pizzas}
        deleteCallback={deleteCallback}
        editCallback={editCallback}
      />
    </div>
  );

}

export default App;