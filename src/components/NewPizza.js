import { useState } from 'react';
import availableToppings from '../const/availableToppings';

import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const NewPizza = ({ saveCallback }) => {

  // open or close dialog state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // keep track of input values
  const [name, setName] = useState('');
  const [size, setSize] = useState('Small');
  const [toppings, setToppings] = useState([]);

  // handle value updates
  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSize = (event) => setSize(event.target.value);
  const handleChangeToppings = (event, value) => setToppings(value);

  // save pizza
  const handleSave = () => {

    // validate that there are no empty fields
    if (!name || !size || !toppings.length)
      return alert('Check that your pizza has a name, size, and at least one topping.')

    // create new pizza object
    let newPizza = {
      id: crypto.randomUUID(),
      name,
      size,
      toppings
    }

    // check for duplicate pizzas
    if (window.pizzaExists(newPizza)) {
      alert('Duplicate pizza already exists')
    }
    else {

      // save the pizza
      saveCallback(newPizza);

      // reset the inputs
      setName('');
      setSize('Small');
      setToppings([]);

      // close the dialog
      handleClose();
    }

  };

  // render the components
  return (
    <>

      <div className='new-pizza-container'>
        <Button variant='outlined' onClick={handleOpen}>
          Add New Pizza
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
      >

        <DialogTitle>
          Create a new pizza below 🍕
        </DialogTitle>

        <DialogContent>

          <br />

          <TextField
            label='Name'
            value={name}
            onChange={handleChangeName}
            fullWidth
          />

          <br /><br />

          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={size}
              label='Size'
              onChange={handleChangeSize}
            >
              <MenuItem value='Small'>Small (10 in)</MenuItem>
              <MenuItem value='Medium'>Medium (12 in)</MenuItem>
              <MenuItem value='Large'>Large (14 in)</MenuItem>
            </Select>
          </FormControl>

          <br /><br />

          <Autocomplete
            multiple
            options={availableToppings}
            disableCloseOnSelect
            onChange={handleChangeToppings}
            value={toppings}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.emoji} {option.title}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label='Toppings' />
            )}
            renderTags={(value) => {
              return value.map((option, index) => (
                <Chip
                  key={option.title}
                  icon={<Avatar sx={{ width: 24, height: 24 }}>{option.emoji}</Avatar>}
                  label={option.title}
                />
              ));
            }}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>

      </Dialog>
    </>
  );

};

export default NewPizza;
