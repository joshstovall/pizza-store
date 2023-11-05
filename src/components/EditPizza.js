import { useState } from 'react';
import availableToppings from '../const/availableToppings'
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditPizza = ({ id, name, size, toppings, saveCallback }) => {

  const [_name, setName] = useState(name);
  const [_size, setSize] = useState(size);
  const [_toppings, setToppings] = useState(toppings);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSize = (event) => setSize(event.target.value);
  const handleChangeToppings = (event, value) => setToppings(value);


  const handleSave = () => {

    // validate that there are no empty fields
    if (!_name || !_size || !_toppings.length)
      return alert('Check that your pizza has a name, size, and at least one topping.')

    console.log(id, 'id')


    let updatedPizza = {
      id,
      name: _name,
      size: _size,
      toppings: _toppings
    };

    if (window.pizzaExists(updatedPizza)) {
      alert('Duplicate pizza already exists')
    }
    else {

      // save the edited pizza
      saveCallback(updatedPizza);

      // close the dialog
      handleClose();
    }
  };


  return (
    <>

      <Button onClick={handleClickOpen}>
        Edit
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >

        <DialogTitle>
          Edit pizza below 🍕
        </DialogTitle>
        <DialogContent>

          <br />

          <TextField
            label='Name'
            value={_name}
            onChange={handleChangeName}
            fullWidth
          />

          <br /> <br />

          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={_size}
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
            value={_toppings}
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

export default EditPizza;
