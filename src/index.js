import logger from 'loglevel'
import { startServer } from './start'
import 'reflect-metadata'
import { connectDb } from './db/connect'

const isTest = process.env.NODE_ENV === 'test'
const logLevel = process.env.LOG_LEVEL || (isTest ? 'warn' : 'info')

logger.setLevel(logLevel)

connectDb()
startServer()