const NoteModel = require("../models/note.model");

exports.create = async (req, res, next) =>
{
    try {
        const newNote = await NoteModel.create(req.body);
        res.status(201).json(newNote);
    } catch (err) {
        next(err);
    }
};

exports.listAll = async () =>
{
    try {
    } catch (err) {
    }
};

exports.getById = async () =>
{
    try {
    } catch (err) {
    }
};

exports.updateById = async () =>
{
    try {

    } catch (err) {
    }
};

exports.deleteById = async () =>
{
    try {
    } catch (err) {
    }
};