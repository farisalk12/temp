function r_e(id) {
  return document.querySelector(`#${id}`);
}

const teams = [
  {
    name: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    fans_mil: 798,
  },
  {
    name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    fans_mil: 738,
  },
  {
    name: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    fans_mil: 755,
  },
  {
    name: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    fans_mil: 537,
  },
  {
    name: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    fans_mil: 950,
  },
  {
    name: "Argentina national team",
    city: "Not applicable",
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    fans_mil: 888,
  },
  {
    name: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torez"],
    fans_mil: 400,
  },
];

teams.forEach((team) => {
  db.collection("teams")
    .where("name", "==", team.name)
    .get()
    .then((t) => {
      if (t.empty) {
        db.collection("teams")
          .add(team)
          .then((docRef) => console.log("Added:", docRef.id))
          .catch((error) => console.error("Error:", error));
      } else {
        console.log(`${team.name} already exists`);
      }
    });
});

db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("spainteams").innerHTML = html;
  });

db.collection("teams")
  .where("country", "==", "Spain")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("madrid").innerHTML = html;
  });
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("national").innerHTML = html;
  });

db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("nspain").innerHTML = html;
  });

db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("nspen").innerHTML = html;
  });
db.collection("teams")
  .where("country", "==", "Spain")
  .where("fans_mil", ">", 700)
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("sp700").innerHTML = html;
  });
db.collection("teams")
  .where("fans_mil", ">", 500)
  .where("fans_mil", "<", 600)
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("q7").innerHTML = html;
  });
db.collection("teams")
  .where("topScorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;

    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("ron").innerHTML = html;
  });
db.collection("teams")
  .where("topScorers", "array-contains-any", ["Messi", "Ronaldo", "Maradona"])
  .get()
  .then((data) => {
    mydocs = data.docs;
    let html = ``;
    mydocs.forEach((d) => {
      let temp = d.data();
      html += `<p>${temp.name}</p>`;
    });
    r_e("rmm").innerHTML = html;
  });

// Update Real Madrid
db.collection("teams")
  .doc("Real Madrid")
  .update({
    "worldwide fans (in millions)": 811,
    "team name": "Real Madrid FC",
  })
  .then(() => {
    console.log("Real Madrid updated!");
  })
  .catch((error) => {
    console.error("Error updating Real Madrid:", error);
  });

// Update Barcelona
db.collection("teams")
  .doc("Barcelona")
  .update({
    "worldwide fans (in millions)": 747,
    "team name": "FC Barcelona",
  })
  .then(() => {
    console.log("Barcelona updated!");
  })
  .catch((error) => {
    console.error("Error updating Barcelona:", error);
  });

const realMadridRef = db.collection("teams").doc("Real Madrid");
const barcelonaRef = db.collection("teams").doc("Barcelona");

// Real Madrid: Remove Hazard, add Crispo
realMadridRef
  .update({
    topScorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
  })
  .then(() => {
    return realMadridRef.update({
      topScorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
    });
  })
  .then(() => {
    console.log("Real Madrid top scorers updated!");
  })
  .catch((error) => {
    console.error("Error updating Real Madrid scorers:", error);
  });

// Barcelona: Remove Puyol, add Deco
barcelonaRef
  .update({
    topScorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
  })
  .then(() => {
    return barcelonaRef.update({
      topScorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
    });
  })
  .then(() => {
    console.log("Barcelona top scorers updated!");
  })
  .catch((error) => {
    console.error("Error updating Barcelona scorers:", error);
  });

// Add initial jersey colors
realMadridRef
  .update({
    color: {
      home: "White",
      away: "Black",
    },
  })
  .then(() => {
    console.log("Real Madrid colors added!");
  })
  .catch((error) => {
    console.error("Error adding Real Madrid colors:", error);
  });

barcelonaRef
  .update({
    color: {
      home: "Red",
      away: "Gold",
    },
  })
  .then(() => {
    console.log("Barcelona colors added!");
  })
  .catch((error) => {
    console.error("Error adding Barcelona colors:", error);
  });

realMadridRef
  .update({
    "color.away": "Purple",
  })
  .then(() => {
    console.log("Real Madrid away color updated!");
  })
  .catch((error) => {
    console.error("Error updating Real Madrid away color:", error);
  });

barcelonaRef
  .update({
    "color.away": "Pink",
  })
  .then(() => {
    console.log("Barcelona away color updated!");
  })
  .catch((error) => {
    console.error("Error updating Barcelona away color:", error);
  });
