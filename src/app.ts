import express, { ErrorRequestHandler, Request, Response } from "express"
import apiRoutes from "./routes"
import { mongoConnect } from './instances/db'
import rateLimit from "express-rate-limit";
import { defaultResponse, responseDefault } from "./models/defaultResponse";

const server = express();

server.use(express.json())

// access limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 request per windowMs,
  message: 'Too many requests, please try again later',
  validate: {ip: false}
})

server.use(limiter)

// Connection with Mongo

mongoConnect()

// Others

server.use(apiRoutes)

server.get("/ping", (req: Request, res: Response) => res.json({ pong: true }))

// Error default

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

  err.status ? res.status(err.status) : res.status(400)

  err.message ? res.json({ error: err.message }) : res.json(response)
}

server.use(errorHandler)

export default server