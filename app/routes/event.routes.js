const express = require('express')
const router = express.Router()
const eventController = require("../controller/event.controller");

// const eventModel = require('../models/Event')
const auth = require("../middleware/auth.middleware")
const isAdmin = require("../middleware/isAdmin")

router.post('/add',auth,isAdmin,eventController.addEvent)
router.get("/All",auth, eventController.allEvents);
router.patch("/:id", auth, isAdmin, eventController.updateEvent);
router.delete("/:id", auth, isAdmin, eventController.deleteEvent);
router.get("/search",eventController.find)
// ========================== Attend Event ========================
router.post('/:eventId/:attend/:userId',auth,eventController.Attend)
module.exports = router;