const noteController = require('../../controllers/notes.controller');
const noteModel = require('../../models/note.model');
const newNote = require('../mock-data/newNote.json')
const httpMocks = require('node-mocks-http');

jest.mock("../../models/note.model.js");

let req, res, next;
beforeEach(() =>
{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});


describe("NoteController.create", () =>
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
