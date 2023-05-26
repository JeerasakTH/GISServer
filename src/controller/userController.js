const { hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN,
} = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from users");
    return res.status(200).json({
      status: "success",
      message: "Get users successfully",
      payload: rows,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
      payload: [],
    });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPassword = await hash(password, 10);
    const { rows } = await pool.query(
      "insert into users(username, password) values($1, $2) returning *",
      [username, hashPassword]
    );

    return res.status(201).json({
      status: "success",
      message: "Registration successfully",
      payload: rows,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
      payload: [],
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // let user
  try {
    const { rows } = await pool.query(
      "select * from users where username = $1",
      [username]
    );

    if (!rows) {
      return res.status(422).json({
        status: "failed",
        message: "User not found",
        payload: [],
      });
    }

    const validPassword = await compare(password, rows[0].password);

    if (!validPassword) {
      return res.status(422).json({
        status: "failed",
        message: "Wrong password",
        payload: [],
      });
    }

    const token = jwt.sign(
      { id: rows[0].user_id, username: rows[0].username },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    const cookieOptions = {
      expires: new Date(
        Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      payload: token,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
      payload: [],
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("jwt", { httpOnly: true }).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
