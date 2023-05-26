const { Router } = require("express");
const {
  addAirport,
  getAirport,
  getAllAirport,
} = require("../controller/airportController");
const { verifyToken } = require("../controller/authController");
const {
  getUsers,
  register,
  login,
  logout,
} = require("../controller/userController");
const router = Router();

router.get("/get-users", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/get-airport", verifyToken, getAirport);
router.get("/getallresult", verifyToken, getAllAirport);
router.post("/add-airport", addAirport);

module.exports = router;
