const pool = require("../db/db");

exports.addAirport = async (req, res) => {
  const { lmtname, lat, lon } = req.body;

  try {
    const { rows } = await pool.query(
      "insert into points(LM_TNAME, LAT, LON) values($1, $2, $3) returning *",
      [lmtname, lat, lon]
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

exports.getAirport = async (req, res) => {
  const { page, size } = req.query;
  try {
    const { rows } = await pool.query(
      "select * from points limit $2 offset (($1 - 1) * $2)",
      [page, size]
    );

    return res.status(200).json({
      result: rows.length,
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

exports.getAllAirport = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from points");

    return res.status(200).json({
      result: rows.length,
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
