/* Populate Database */
async function populateDatabase() {
  try {
    const response = await fetch("/populate_database", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to populate database");
    }
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

/* Adopt Animal */
async function adoptAnimal(id) {
  console.log("********************");
  await fetch("/animals/adopt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Animal adopted successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* Cancel Adoption */
async function deleteAnimal(id) {
  console.log("********************");
  await fetch("/animals/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Animal adoption deleted successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* Update Species */
async function updateSpecies(id) {
  console.log("updateSpecies");
  const newSpecies = prompt("Update species");

  if (!newSpecies) {
    alert("Please provide a new name for the Species.");
    return;
  }

  await fetch("/species/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      species: newSpecies,
    }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Species updated successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* Delete Species */
async function deleteSpecies(id) {
  await fetch("/species/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Species deleted successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* Update Temperament */
async function updateTemperament(id) {
  console.log("updateTEMPerament");
  newTemperament = prompt("Update temperament");

  if (!newTemperament) {
    alert("Please provide a new name for the Temperament.");
    return;
  }

  await fetch("/temperament/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      temperament: newTemperament,
    }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Temperament updated successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* Delete Temperament */
async function deleteTemperament(id) {
  await fetch("/temperament/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
        return Promise.resolve("Temperament deleted successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}