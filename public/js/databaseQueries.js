/* Popular Animal Names */
function sqlQuery1() {
  console.log("sqlQuery1");
  try {
    window.location.href = "/animals/popularity";
  } catch (error) {
    console.error("Error redirecting:", error);
  }
}

/* Adopted Animals */
function sqlQuery2() {
  console.log("sqlQuery2");
  try {
    window.location.href = "/animals/adopted";
  } catch (error) {
    console.error("Error redirecting:", error);
  }
}

/* Animals by Age */
function sqlQuery3() {
  console.log("sqlQuery3");
  try {
    window.location.href = "/animals/age";
  } catch (error) {
    console.error("Error redirecting:", error);
  }
}

/* Animals Born in Date Range */
async function sqlQuery4() {
  const dateFrom = prompt("Enter the date from (YYYY-MM-DD):");
  const dateTo = prompt("Enter the date to (YYYY-MM-DD):");

  if (!dateFrom || !dateTo) {
    alert("Please provide both date from and date to.");
    return;
  }

  try {
    const response = await fetch("/animals/born", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateFrom: dateFrom,
        dateTo: dateTo,
      }),
    });

    if (response.ok) {
      const data = await response.text();
      console.log(data);
      window.location.href = "/animals/born";
      return Promise.resolve("Query inserted successfully");
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    alert(error);
  }
}

/* Animals per Size */
async function sqlQuery5() {
  await fetch("/animals/size", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        const message = data
          .map((entry) => `${entry.Animal_Size}: ${entry.Number_of_Animals}`)
          .join("\n");
        alert("Numbers of animals per size:\n" + message);
        location.reload();
        return Promise.resolve("Query inserted successfully");
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      alert(response.statusText);
    });
}

/* All Animals */
function allAnimals() {
  console.log("allAnimals");
  try {
    window.location.href = "/animals";
  } catch (error) {
    console.error("Error redirecting:", error);
  }
}