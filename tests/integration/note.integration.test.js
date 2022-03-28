const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const newNote = require("../mock-data/newNote.json");

const endpointUrl = "/note/";

const nonExistingNoteId = "5d5fff416bef3c07ecf11f77";

describe(endpointUrl, () =>
{
    beforeAll((done) =>
    {
        if (!mongoose.connection.db) {
            mongoose.connection.on('connected', done)
        } else {
            done();
        }
    }, 20000);

    it("should get all notes", async (done) =>
    {
        try {
            const res = await request(app).get(endpointUrl);
            console.log('res', res)
        } catch (error) {
            done(error)
        }
    })

    // afterEach(async done =>
    // {
    //     await mongoose.connection.close();
    //     await app.close()
    //     done();
    // });
    afterAll(async () =>
    {
        // await mongoose.connection.close();
        await mongoose.disconnect();
    });
});
