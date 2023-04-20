const eventModel=require('../../DB/models/event.model.js')
const userModel=require('../../DB/models/user.model.js')
const Helper = require('../helper.js')

class event {
    static addEvent = async (req, res) => {
        try {
          const {name,date,location,description} =req.body;
          const event = await eventModel.create(req.body)
          Helper.resHandler(res, 200, true, event, "added Successfully");
        } catch (error) {
            Helper.resHandler(res, 500, false, error.message, "Error in add");
         }
    }
    static allEvents = async (req, res) => {
        try {
          const event = await eventModel.find();
          Helper.resHandler(res, 200, true, event, "done");
        } catch (error) {
          Helper.resHandler(res, 500, false, error.message, "Error in finding");
        }
    };
    static updateEvent = async (req, res) => {
        try {
          const event = await eventModel.findById(req.params.id);
          for (let key in req.body) {
            event[key] = req.body[key];
          }
          await event.save();
          Helper.resHandler(res, 200, true, event, "edited Successfully");
        } catch (error) {
          Helper.resHandler(res, 500, false, error.message, "Error in editing");
        }
    }
    static deleteEvent = async (req, res) => {
        try {
          const event = await eventModel.findByIdAndDelete(req.params.id);
          Helper.resHandler(res, 200, true, event, "deleted Successfully");
        } catch (error) {
          Helper.resHandler(res, 500, false, error.message, "Error in deleting");
        }
    }
    static Attend= async (req, res) => {
      try {
        const event = await eventModel.findById(req.params.eventId);
        const user = await userModel.findById(req.params.userId);
    
        if (!event) {
          Helper.resHandler(res, 500, false, error.message, "Error event not found");

        }
    
        if (!user) {
          Helper.resHandler(res, 500, false, error.message, "Error user Not found ");
          
        }
        event.attendees.push(user);
        await event.save();
        res.send(event);
      } catch (err) {
        console.log(err);
        Helper.resHandler(res, 500, false, err.message, "Error");

      }
    }
    static find = async (req, res) => {
      const searchQuery = req.query.q;
      try {
        const results = await eventModel.find({ title: { $regex: searchQuery, $options: 'i' } });
        res.send(results);
      } catch (err) {
        console.error(err);
        Helper.resHandler(res, 500, false, err.message, "Error");
  
      }
    }
}

module.exports=event