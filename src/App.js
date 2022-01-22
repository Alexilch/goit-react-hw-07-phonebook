// import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from './redux/actions';
// import { filteredContacts, getFilter } from './redux/selectors.js';

import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from './redux/contactSlice.js';
import { connect } from 'react-redux';


// import './App.css';
import s from './App.css'
// import { nanoid } from 'nanoid';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from  'react-loader-spinner'
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import ContactForm from './components/ContactForm';
import ContactLIst from './components/ContactList';
import Filter from './components/Filter/Filter';
import Title from './components/Title/Title';

const App = ({ filter, changeFilter }) => {
  const { data, error, isFetching } = useFetchContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

 
  // const formHandler = data => {
  //   const existingName = contacts.find(contact =>
  //     contact.name.includes(data.name),
  //   );

  //   if (!existingName) {
  //     const Id = { id: nanoid(5) };
  //     dispatch(addContact([...contacts, { ...Id, ...data }]));
  //   } else {
  //     error({
  //       text: `${existingName.name} is already in the list!`,
  //       delay: 1500,
  //     });
  //   }
  // };

  // const contactDelete = id => {
  //   dispatch(deleteContact(id));
  // };

  const contactFilter = value => {
    if (value === '') {
      return data;
    } else {
      return data.filter(({name}) => {
        return name.toLocaleLowerCase().includes(value);
      });
    }
  };

  return (
    <div className="App">
      <Title title={'Phone book'} />
      <ContactForm contacts={data} />
      <Title title={'Contacts'} />
      <Filter value={filter} onChange={changeFilter} />
      {data && (
      <ContactLIst contacts={contactFilter(filter)} onDelete={deleteContact} />
      )}
      <div className='spinner'>
       {isFetching && <Bars heigth="100" width="100" color="violet" arialLabel="loading-indicator" className='spinner' />}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.filter.filter,
});

const mapDispatchToProps = dispatch => ({
  changeFilter: value => dispatch(changeFilter(value.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
