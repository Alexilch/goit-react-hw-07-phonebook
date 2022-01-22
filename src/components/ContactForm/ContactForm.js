import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { useState } from 'react';
import { useAddContactMutation} from '../../redux/contactSlice'
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const ContactForm = ({ contacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact] = useAddContactMutation();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        // console.log(value);
        break;
      case 'phone':
        setPhone(value);
        // console.log(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    
    if (contacts) {
      // console.log(contacts);
      if (contacts.some(contact => contact.name.includes(name))) {
        error(`${name} is already in contacts!`);
        resetForm();
        return;
      }
    }
    const contact = { 
      name: name,
      phone: phone,
     };

    addContact(contact);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={s.addbutton}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.array,
};

export default ContactForm;
