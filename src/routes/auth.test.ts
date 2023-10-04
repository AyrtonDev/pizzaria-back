import { beforeAll, describe, expect, it } from "bun:test"
import request from 'supertest'
import app from '../app'
import User from "../models/User"

describe('Testing api routes',() => {

    // beforeAll(async () => {
    //     await User.deleteMany({})
    // })

    it('should ping pong', (done) => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy()
                return done()
            })
    })
})