import EditPizza from './EditPizza';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const Pizza = ({ id, name, size, toppings, deleteCallback, editCallback }) => {

  // delete a pizza
  const deletePizza = (pizza) => deleteCallback(pizza);

  // save an edited pizza
  const saveCallback = (pizza) => editCallback(pizza);

  // render the components
  return (
    <Card key={id}>

      <CardContent>

        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {size} Pizza
        </Typography>

        <List className='toppings'>
          {
            toppings?.length ?
              toppings.map((topping) => (
                <ListItem
                  key={topping.title}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label='comment'>
                      {topping.emoji}
                    </IconButton>
                  }
                >
                  <ListItemText primary={topping.title} />
                </ListItem>
              )) : null
          }
        </List>

      </CardContent>

      <CardActions>

        <EditPizza
          id={id}
          name={name}
          size={size}
          toppings={toppings}
          saveCallback={saveCallback}
        />

        <Button onClick={deletePizza}>
          Delete
        </Button>

      </CardActions>
    </Card>
  );
}

export default Pizza;