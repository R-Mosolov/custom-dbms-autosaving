const fs = require("fs");
const { __reponame } = require("../constants/paths");

class Docs {
  constructor() {}

  readOne(collection, id) {
    return require(`../db/${collection}`).find(
      (item) => item.id === id
    );
  }

  readAll(collection) {
    return require(`../db/${collection}`);
  }

  create(collection, data) {
    fs.writeFileSync(
      __reponame + `/db/${collection}.json`,
      JSON.stringify([...this.readAll(collection), data]),
      "utf8",
      (error, data) => {
        if (error) {
          return error;
        }
        return data;
      }
    );
  }
}

module.exports = Docs;
