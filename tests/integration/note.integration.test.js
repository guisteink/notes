const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const newNote = require("../mock-data/newNote.json");

const endpointUrl = "/note/";
let firstNote, newNoteId;

const nonExistingNoteId = "5d5fff416bef3c07ecf11f77";

describe(endpointUrl, () =>
{
    beforeEach((done) =>
    {
        if (!mongoose.connection.db) {
            mongoose.connection.on('connected', done)
        } else {
            done();
        }
    }, 1000);

    it("should get all notes", async () =>
    {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstNote = response.body[0];
    })

    it("should return one especific note by id", async () =>
    {
        const response = await request(app).get(endpointUrl + '/' + firstNote._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstNote.title);
        expect(response.body.done).toBe(firstNote.done);
    })

    it("should return a error because i'm passing a wrong id to get a specific note", async () => {
        const response = await request(app).get(endpointUrl + '/' + nonExistingNoteId._id);
        expect(response.statusCode).toBe(404);
    })

});
