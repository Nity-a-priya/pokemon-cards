const card = async () => {
  const data = await fetchJson();

  parent = document.querySelector(".row");
  createChild(data);
};

const fetchJson = async () => {
  const data = await fetch("pokemonData.json");
  const json = await data.json();
  return json;
};

const createChild = (data) => {
  
  
  for (obj of data) {
    const child = createElement("div");
    child.className = "card";
    parent.appendChild(child);
    const getTable = table();
    addRow(getTable, "ID", obj.id);
    addRow(getTable, "Type", obj.type);
    addRow(getTable, "Height", obj.height);
    addRow(getTable, "Weight", obj.weight);
    addRow(getTable, "Weaknesses", obj.weaknesses);
    child.innerHTML = giveImg(obj.img) + giveName(obj.name) + giveDescription(obj.description) + getTable.outerHTML;
    child.style.setProperty('--background',`url('${obj.img}')`);
  }
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
const giveDescription = (description) => {
  const p = createElement("p");
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
