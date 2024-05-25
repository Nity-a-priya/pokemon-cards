const json = require("./pokemonData.json");

const handleSearch = (req, response) => {
  const enteredValue = req.query.value.toLowerCase();

  const matchName = json.filter((obj) =>
    obj.name.toLowerCase().includes(enteredValue)
  );
  const matchType = json.filter((obj) =>
    obj.type.some((t) => t.toLowerCase().includes(enteredValue))
  );
  const filteredCards = [...new Set([...matchName, ...matchType])];
  const filteredCardNames = filteredCards.map((card) => card.name);

  response.send(filteredCardNames);
};

const getData = (req, res, next) => {
  console.log(res.body);
  res.send(json);
};

module.exports = { handleSearch, getData };
