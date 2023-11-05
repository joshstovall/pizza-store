import { useEffect, useState } from 'react';
import Pizza from './Pizza';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const Pizzas = ({ pizzas, deleteCallback, editCallback }) => {

  // keep track of current pizzas
  const [currentPizzas, setCurrentPizzas] = useState(pizzas)

  // listen for pizzas to change
  useEffect(() => setCurrentPizzas(pizzas), [pizzas]);

  // render the components
  return (
    <Container>

      <h2>Pizzas</h2>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          currentPizzas.length ?
            currentPizzas.map(
              (pizza) => <Grid item xs={12} md={6} key={pizza.id}>
                <Pizza
                  id={pizza.id}
                  name={pizza.name}
                  size={pizza.size}
                  toppings={pizza.toppings}
                  deleteCallback={() => deleteCallback(pizza)}
                  editCallback={editCallback}
                />
              </Grid>
            ) :
            <div className='no-pizza-container'>
              No pizzas exist. Click <b>Add New Pizza</b> to create a new pizza.
            </div>
        }
      </Grid>

    </Container>
  );
};

export default Pizzas;
