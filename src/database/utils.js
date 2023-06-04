/*
 ** utility to save data to json file.
 */
import fs from "fs";

const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

export default saveToDatabase;
