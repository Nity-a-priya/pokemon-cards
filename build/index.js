let DATA = [];

const card = async () => {
  await fetchJson();
  const data = DATA;

  parent = document.querySelector(".row");
  createChild(data);
};

const fetchJson = async () => {
  const data = await fetch("/data");
  const json = await data.json();

  DATA = json;
};

const createChild = (data) => {
  const typesArray = [];
  for (obj of data) {
    const child = createElement("div");
    child.className = "card";
    parent.appendChild(child);
    const getTable = table();
    addRow(getTable, "ID", obj.id);
    addRow(getTable, "Height", obj.height);
    addRow(getTable, "Weight", obj.weight);
    addRow(getTable, "Weaknesses", obj.weaknesses);
    addRow(getTable, "Candy Count", obj.candy_count);
    addRow(getTable, "Egg", obj.egg);

    const show = createElement("div");
    show.className = "show";
    child.appendChild(show);

    show.innerHTML = giveImg(obj.img) + giveName(obj.name) + giveType(obj.type);
    const hide = createElement("div");
    hide.className = "hide";
    child.appendChild(hide);
    hide.innerHTML =
      giveImg(obj.art_url) +
      giveDescription(obj.description) +
      getTable.outerHTML;
    hide.style.setProperty("--background", `url('${obj.img}')`);
  }
};

const changeDisplayStyle = (array, displayValue) => {
  array.forEach((element) => {
    element.style.display = displayValue;
  });
};

const search = async () => {
  const input = document.getElementById("myInput");
  const entertedValue = input.value.toLowerCase();
  const cards = [...document.querySelectorAll(".card")];

  const apiurl = "/search?value=" + entertedValue;
  const url = await fetch(apiurl);
  const filteredCardNames = await url.json();

  const filteredCards = cards.filter((card) =>
    filteredCardNames.includes(card.getElementsByTagName("h3")[0].textContent)
  );

  changeDisplayStyle(cards, "none");
  changeDisplayStyle(filteredCards, "");
};

const createElement = (ele) => {
  return document.createElement(ele);
};
const giveImg = (img) => {
  const image = createElement("img");
  image.src = img;
  return image.outerHTML;
};
const giveName = (name) => {
  const h3 = createElement("h3");
  h3.innerHTML = name;
  return h3.outerHTML;
};

const LOOKUP_OBJECT = {
  Grass: "green",
  Fire: "red",
  Water: "blue",
  Poison: "maroon",
  Flying: "#046ab3",
  Bug: "purple",
  Normal: "black",
  Electric: "yellow",
  Ground: "gray",
  Fighting: "pink",
  Psychic: "orange",
  Rock: "brown",
  Ice: "cyan",
  Ghost: "lime",
  Dragon: "#FF7F7F",
};

const giveType = (type) => {
  const row = createElement("div");
  let circle;
  let text;
  let cir;
  let bgColor;
  for (t of type) {
    cir = createElement("div");
    cir.className = "inner-row";
    circle = createElement("div");
    circle.className = "circle";
    bgColor = LOOKUP_OBJECT[t];
    circle.style.setProperty("--color", bgColor);
    cir.appendChild(circle);
    text = createElement("p");
    text.className = "text";
    text.innerHTML = t;
    cir.appendChild(text);
    row.appendChild(cir);
  }
  return row.outerHTML;
};
const giveDescription = (description) => {
  const p = createElement("p");
  p.className = "description";
  p.innerHTML = description;
  return p.outerHTML;
};

let table = () => {
  const tbl = createElement("table");
  tbl.className = "table";
  return tbl;
};

const addRow = (tbl, type, value) => {
  const tr = createElement("tr");
  const th = createElement("th");
  const td = createElement("td");
  tr.appendChild(th);
  tr.appendChild(td);
  th.innerHTML = type;
  td.innerHTML = value;
  tbl.appendChild(tr);
};
