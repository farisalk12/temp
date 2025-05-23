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

const FieldValue = firebase.firestore.FieldValue;

const realMadridRef = db.collection("teams").doc("RealMadrid");
realMadridRef.update({
  name: "Real Madrid FC",
  fans_mil: 811,
});
realMadridRef
  .update({
    topScorers: FieldValue.arrayRemove("Hazard"),
  })
  .then(() => {
    realMadridRef.update({
      topScorers: FieldValue.arrayUnion("Crispo"),
    });
  });
realMadridRef.update({
  color: { home: "White", away: "Purple" },
});

const barcelonaRef = db.collection("teams").doc("Barcelona");
barcelonaRef.update({
  name: "FC Barcelona",
  fans_mil: 747,
});
barcelonaRef
  .update({
    topScorers: FieldValue.arrayRemove("Puyol"),
  })
  .then(() => {
    barcelonaRef.update({
      topScorers: FieldValue.arrayUnion("Deco"),
    });
  });
barcelonaRef.update({
  color: { home: "Red", away: "Pink" },
});
