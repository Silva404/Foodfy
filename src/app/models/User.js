const db = require("../../config/db");
const crypt = require("crypto");
const Recipes = require("./Recipes");

module.exports = {
  async all() {
    const results = await db.query(`SELECT * FROM users`);

    return results.rows;
  },
  async findUser(id) {
    try {
      const results = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

      return results.rows[0];
    } catch (err) {
      console.log("erro no findUser");
      console.error(err);
    }
  },
  async findOne(filters) {
    try {
      let query = `SELECT * FROM users`;

      Object.keys(filters).map((key) => {
        query = `
        ${query}
        ${key}
      `;
        Object.keys(filters[key]).map((field) => {
          query = `${query} ${field} = '${filters[key][field]}'`;
        });
      });

      const results = await db.query(query);

      return results.rows[0];
    } catch (err) {
      console.error(err);
    }
  },
  async create(data) {
    try {
      const query = `
      INSERT INTO users (
        name,
        email,
        password,
        is_admin
      ) VALUES ($1, $2, $3, $4)
      RETURNING id`;

      const newPassword = crypt.randomBytes(8).toString("hex");

      const values = [
        data.name,
        data.email,
        newPassword,
        data.is_admin || false,
      ];

      const results = await db.query(query, values);

      return results.rows[0];
    } catch (err) {
      console.log("erro no create");
      console.error(err);
    }
  },
  async update(id, fields) {
    let query = `UPDATE users SET`;

    Object.keys(fields).map((key, index, array) => {
      if (index + 1 < array.length) {
        query = `${query} ${key} = '${fields[key]}',`;
      } else {
        query = `${query} ${key} = '${fields[key]}'
        WHERE id = ${id}`;
      }
    });

    await db.query(query);
  },
  async delete(id) {
    try {
      // const recipeId = await db.query(`
      // SELECT recipes.id
      // FROM recipes
      // LEFT JOIN users ON (users.id = recipes.user_id)
      // WHERE users.id = $1)`)
      // if (recipeId) { await Recipes.delete(recipeId) }

      await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    } catch (err) {
      console.error(err);
    }
  },
};
