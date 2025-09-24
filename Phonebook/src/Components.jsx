const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <form>
      <div>
        Filter shown with{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};

const Person = ({ name, number, id, handlechange }) => {
  return (
    <div>
      {name} {number} <button onClick={() => handlechange(id)}>delete</button>
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handlePersonChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <div>
          debug: {newName} {newNumber}
        </div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ personfilter, handlechange }) => {
  return (
    <div>
      {personfilter.map((person) => (
        <li key={person.id}>
          <Person
            name={person.name}
            number={person.number}
            id={person.id}
            handlechange={handlechange}
          />
        </li>
      ))}
    </div>
  );
};

export { Filter, PersonForm, Persons, Person };
