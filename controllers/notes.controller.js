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

exports.updateById = async (req, res, next) =>
{
    try {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            req.params.noteId,
            req.body,
            { new: true, useFindAndModify: false }
        )
        return updatedNote ? res.status(200).json(updatedNote) : res.status(404).send()
    } catch (err) {
        next(err)
    }
};

exports.listAll = async (req, res, next) =>
{
    try {
        const allNotes = await NoteModel.find({});
        res.status(200).json(allNotes);
    } catch (err) {
        next(err);
    }
};

exports.getById = async () =>
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