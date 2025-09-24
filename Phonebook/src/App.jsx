import { useState, useEffect } from "react";
import { Filter, PersonForm, Persons } from "./Components";
import axios from "axios";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    phonebook.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        phonebook
          .update(existingPerson.id, person)
          .then((response) => {
            setPersons(
              persons.map((p) =>
                p.id !== response.data.id ? p : response.data
              )
            );
            handleNotification(`Updated ${existingPerson.name}`);
          })
          .catch((error) => {
            handleNotification(
              `Information of ${existingPerson.name} has already been removed from server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      phonebook.create(person).then((response) => {
        setPersons(persons.concat(response.data));
        handleNotification(`Added ${person.name}`);
      })
        .catch(error => {
          handleNotification(error.response.data.error, "error");
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const deletePerson = (id) => {
    console.log(id);
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebook.deletePerson(id).then((response) => {
        setPersons(persons.filter((p) => p.id !== id));
      });
      handleNotification(`Deleted ${person.name}`, "success");
    }
  };

  const personfilter = newFilter
    ? persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message ? (
        <div className={notification.type === "error" ? "error" : "success"}>
          {notification.message}
        </div>
      ) : null}
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personfilter={personfilter} handlechange={deletePerson} />
    </div>
  );
};

export default App;
