import express, { Request, Response } from "express"
import apiRoutes from "./routes"
import { mongoConnect } from './instances/db'
import rateLimit from "express-rate-limit";

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

export default server