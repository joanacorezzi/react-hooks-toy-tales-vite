import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
// get all toys on page load
useEffect(() => {
  fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((data) => setToys(data));
}, []);

function handleAddToy(newToy) {
  setToys((toys) => [...toys, newToy]);
}
 function handleDeleteToy(id) {
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  }

  function handleUpdateToy(updatedToy) {
  setToys((toys) =>
    toys.map((toy) => {
      if (toy.id === updatedToy.id) {
        return updatedToy;
      } else {
        return toy;
      }
    })
  );
}
  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />
    </>
  );
}

export default App;
