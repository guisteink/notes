const noteController = require('../../controllers/notes.controller');
const noteModel = require('../../models/note.model');
const newNote = require('../mock-data/newNote.json')
const allNotes = require('../mock-data/allNotes.json');
const httpMocks = require('node-mocks-http');

jest.mock("../../models/note.model.js");

let req, res, next;
const noteId = "623a6ba4b97c942e941af11b";
beforeEach(() =>
{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});


describe("\nNoteController.create", () =>
{
    beforeEach(() =>
    {
        req.body = newNote;
    });

    it("should have a create function", () =>
    {
        expect(typeof noteController.create).toBe('function');
    })

    it("should return a 201 response code", async () =>
    {
        await noteController.create(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should call a create method", async () =>
    {
        await noteController.create(req, res, next);
        expect(noteModel.create).toBeCalledWith(newNote);
    })

    it("should handle erros", async () =>
    {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        noteModel.create.mockReturnValue(rejectedPromise);
        await noteController.create(req, res, next);
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe("\nNoteController.updateById", () =>
{
    it("should have a updateById function", () =>
    {
        expect(typeof noteController.updateById).toBe('function');
    })

    it("should update with noteModel.findByIdAndUpdate", async () =>
    {
        req.params.noteId = noteId;
        req.body = newNote;
        await noteController.updateById(req, res, next);

        expect(noteModel.findByIdAndUpdate).toHaveBeenCalledWith(noteId, newNote, {
            new: true,
            useFindAndModify: false
        });
    })

    it("should return a response with json data and http code 200", async () =>
    {
        req.params.noteId = noteId;
        req.body = newNote;
        noteModel.findByIdAndUpdate.mockReturnValue(newNote);
        await noteController.updateById(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newNote);
    })

    it("should handle errors", async () =>
    {
        const errorMsg = { message: "Error" };
        const rejectedPromise = Promise.reject(errorMsg);
        noteModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await noteController.updateById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMsg);
    })

})

describe("\nnoteController.listAll", () =>
{
    it("should have a listAll function", () =>
    {
        expect(typeof noteController.listAll).toBe('function');
    })

    it("should call noteModel.find({})", async () =>
    {
        await noteController.listAll(req, res, next);
        expect(noteModel.find).toHaveBeenCalledWith({});
    })

    it("should return response with status code 200 and all notes", async () =>
    {
        noteModel.find.mockReturnValue(allNotes);
        await noteController.listAll(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allNotes);
    })

    it("should handle errors", async () =>
    {
        const errorMsg = { message: 'Error finding notes' };
        const rejectPromise = Promise.reject(errorMsg);
        noteModel.find.mockReturnValue(rejectPromise);
        await noteController.listAll(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMsg);
    })

})