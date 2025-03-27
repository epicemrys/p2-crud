const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('connectbox').find();
        const connectbox = await result.toArray();
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(connectbox);
    } catch (error) {
        console.error('Error fetching connectbox entries:', error);
        res.status(500).json({ message: 'An error occurred while retrieving connectbox entries.', error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid connectbox id to find a match.');
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('connectbox').find({ _id: userId });
        
        const connectbox = await result.toArray();
        
        if (connectbox.length === 0) {
            return res.status(404).json({ message: 'Entry not found.' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(connectbox[0]);
    } catch (error) {
        console.error('Error fetching connectbox entry:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the connectbox entry.', error: error.message });
    }
};

const createConnectbox = async (req, res) => {
    try {
        const connectbox = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteHobby: req.body.favoriteHobby,
            birthdayMonth: req.body.birthdayMonth,
            age: req.body.age,
            city: req.body.city
        };

        const existingConnectbox = await mongodb.getDatabase().db().collection('connectbox').findOne({ email: connectbox.email });

        if (existingConnectbox) {
            const response = await mongodb.getDatabase().db().collection('connectbox').updateOne(
                { email: connectbox.email },
                { $set: connectbox }
            );

            if (response.modifiedCount > 0) {
                return res.status(200).json({ message: 'Connectbox entry updated successfully.', connectboxId: existingConnectbox._id });
            } else {
                return res.status(500).json({ message: 'Duplicate entry already exists.' });
            }
        } else {
            const response = await mongodb.getDatabase().db().collection('connectbox').insertOne(connectbox);

            if (response.acknowledged) {
                return res.status(201).json({ message: 'Connectbox entry created successfully.', connectboxId: response.insertedId });
            } else {
                return res.status(500).json({ message: 'Some error occurred while inserting entry.' });
            }
        }
    } catch (error) {
        console.error('Error creating connectbox entry:', error);
        res.status(500).json({ message: 'An error occurred while creating the connectbox entry.', error: error.message });
    }
};

const updateConnectbox = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid connectbox id to update the entry.');
        }
        const userId = new ObjectId(req.params.id);
        const connectbox = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteHobby: req.body.favoriteHobby,
            birthdayMonth: req.body.birthdayMonth,
            age: req.body.age,
            city: req.body.city
        };

        const response = await mongodb.getDatabase().db().collection('connectbox').replaceOne({ _id: userId }, connectbox);

        if (response.modifiedCount > 0) {
            return res.status(200).json({ message: 'Connectbox entry updated successfully.' });
        } else if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Entry not found.' });
        } else {
            return res.status(400).json({ message: 'No changes made to the connectbox entry.' });
        }
    } catch (error) {
        console.error('Error updating connectbox:', error);
        res.status(500).json({ message: 'An error occurred while updating the connectbox entry.', error: error.message });
    }
};

const deleteConnectbox = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid connectbox id to delete the entry.');
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('connectbox').deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            return res.status(200).json({ message: 'Connectbox entry deleted successfully.' });
        } else {
            return res.status(404).json({ message: 'Entry not found.' });
        }
    } catch (error) {
        console.error('Error deleting connectbox entry:', error);
        res.status(500).json({ message: 'An error occurred while deleting the connectbox entry.', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createConnectbox,
    updateConnectbox,
    deleteConnectbox
};