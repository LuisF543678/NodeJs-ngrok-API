const request = require('supertest');

const app = require('../src/app');

/**
 * Testing get all user enpoint
 */

describe('GET /users', () => {
    it('respond with json containing alist of all users', done => {
        request(app)
            .get("/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
})


describe('/GET /users/:id', () => {
    it('respond with json containing alist of all users', done => {
        request(app)
            .get("/users/U0001")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });

    it('respond with json "User 0001 Found" when the user exists', done => {
        request(app)
        .get("/users/U0001")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect('"User U0001 Found"')
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });

    it('respond with json "user not found" when theuser does not exists', done => {
        request(app)
        .get("/users/usernoexitinguser")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .expect('"User not found"')
        .end((err) => {
            if (err) return done(err);
            done();
        });
    })
});

describe("POST /users", () => {
    it('respond with 201 created', done => {
        const data = {
            username:'luisf',
            password:'password1'
        }
        request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(201)
        .end(err => {
            if (err) return done(err);
            done();
        });
    });

    it('respond with code 400 on bad request', done => {
        const data={};
        request(app)
        .post('/users')
        .send(data)
        .set('Accept', 'application/json')
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('"user not created"')
        .end((err) => {
            if (err) done(err)
            done();
        });
    });
});