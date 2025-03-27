const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        const result = await mongodb.getDatabase().db().collection('lovebox').find();
        const lovebox = await result.toArray();
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(lovebox);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'An error occurred while retrieving matches.', error: error.message });
    }
};

const getSingle = async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid lovebox id to find a match.');
          }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('lovebox').find({ _id: userId });
        
        const lovebox = await result.toArray();
        
        if (lovebox.length === 0) {
            return res.status(404).json({ message: 'match not found.' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lovebox[0]);
    } catch (error) {
        console.error('Error fetching match:', error);
        if (error instanceof mongodb.MongoError && error.code === 121) {
            return res.status(400).json({ message: 'Invalid lovebox ID format.' });
        }
        res.status(500).json({ message: 'An error occurred while retrieving the lovebox.', error: error.message });
    }
};

const createLovebox = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const lovebox = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthdayMonth: req.body.birthdayMonth,
            age: req.body.age,
            location: req.body.location
        };

        const existingLovebox = await mongodb.getDatabase().db().collection('lovebox').findOne({ email: lovebox.email });

        if (existingLovebox) {
            const response = await mongodb.getDatabase().db().collection('lovebox').updateOne(
                { email: lovebox.email },
                { $set: lovebox }
            );

            if (response.modifiedCount > 0) {
                return res.status(200).json({ message: 'Match updated successfully.', loveboxId: existingLovebox._id });
            } else {
                return res.status(500).json({ message: 'Duplicate already exists.' });
            }
        } else {
            const response = await mongodb.getDatabase().db().collection('lovebox').insertOne(lovebox);

            if (response.acknowledged) {
                return res.status(201).json({ message: 'Match created successfully.', loveboxId: response.insertedId });
            } else {
                return res.status(500).json({ message: 'Some error occurred while inserting Match.' });
            }
        }
    } catch (error) {
        console.error('Error creating lovebox:', error);
        res.status(500).json({ message: 'An error occurred while creating the lovebox.', error: error.message });
    }
};



const updateLovebox = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid match id to update a lovebox.');
          }
        const userId = new ObjectId(req.params.id);
        const lovebox = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthdayMonth: req.body.birthdayMonth,
            age: req.body.age,
            location: req.body.location
        };

        const response = await mongodb.getDatabase().db().collection('lovebox').replaceOne({ _id: userId }, lovebox);
        console.log(response);

        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Lovebox updated successfully.' });
        } else if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Match not found.' });
        } else {
            return res.status(400).json({ message: 'No changes made to the lovebox.' });
        }
    } catch (error) {
        console.error('Error updating lovebox:', error);
        if (error instanceof mongodb.MongoError && error.code === 121) {
            return res.status(400).json({ message: 'Invalid match ID format.' });
        }
        res.status(500).json({ message: 'An error occurred while updating the lovebox.', error: error.message });
    }
};

const deleteLovebox = async (req, res) => {
    console.log("Received request body:", req.body);
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid lovebox id to delete a match.');
          }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('lovebox').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: 'Match deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'Match not found.' });
        }
    } catch (error) {
        console.log(response);
        console.error('Error deleting match:', error);
        if (error instanceof mongodb.MongoError && error.code === 121) {
            return res.status(400).json({ message: 'Invalid match ID format.' });
        }
        res.status(500).json({ message: 'An error occurred while deleting the lovebox.', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createLovebox,
    updateLovebox,
    deleteLovebox
};