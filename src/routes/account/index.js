import * as crypto from 'crypto'
import express from 'express'
import { getRepository } from 'typeorm'

const DEFAULT_ROUNDS = 4096
const DEFAULT_PASSWORD_LENGTH = 21
const DEFAULT_SALT_LENGTH = 64
const DIGEST = 'sha256'
const BYTE_TO_STRING_ENCODING = 'hex'

const HTTP_STATUS_OK = 200
const HTTP_STATUS_BAD_REQUEST = 400
const HTTP_STATUS_NOT_FOUND = 404

function getAccountRoutes () {
  const router = express.Router()
  router.post('/', createAccount)
  router.post('/check', checkUsername)
  router.post('/login', login)
  router.get('/', getAllAccounts)
  return router
}

async function getAllAccounts(req, res) {
  const accountRepository = getRepository('Account')
  const accounts = await accountRepository.find()

  return res.status(HTTP_STATUS_OK).json({
    success: true,
    message: 'Accounts has been retrieved successfully',
    data: accounts
  })
}

async function createAccount(req, res) {
  const accountRepository = getRepository('Account')

  const account = {
    ...req.body,
    createdAt: new Date().getTime()
  }

  const { salt, hash } = await hashPassword(account.password)
  account.password = hash
  account.salt = salt

  const save = await accountRepository.save(account)

    // dont show this on json response
  Reflect.deleteProperty(save, 'password')
  Reflect.deleteProperty(save, 'salt')

  return res.status(HTTP_STATUS_OK)
    .json({
      success: true,
      message: 'Account has been created successfully',
      data: save
    })
}

async function checkUsername(req, res) {
  const accountRepository = getRepository('Account')
  
  const user = await accountRepository.findOne({
    where: {
      username: req.body.username,
    }
  })

  if (user === undefined || user === null) {
    return res.status(HTTP_STATUS_NOT_FOUND)
      .json({
        success: false,
        message: 'The username is not recognized',
        data: null
      })
  }

  // dont show this on json response
  Reflect.deleteProperty(user, 'password')
  Reflect.deleteProperty(user, 'salt')

  return res.status(200).json({
    success: true,
    message: 'User found',
    data: user
  })
}

async function login(req, res) {
  const { username, password } = req.body

  const accountRepository = getRepository('Account')
  const user = await accountRepository.findOne({
    where: {
      username: username,
    }
  })

  if (user === undefined || user === null) {
    return res.status(HTTP_STATUS_NOT_FOUND)
      .json({
        success: false,
        message: 'User not found',
        data: null
      })
  }

  const isPasswordEqual = await comparePassword({
    account: user,
    rawPassword: password,
  })
  if (!isPasswordEqual) {
    return res.status(HTTP_STATUS_NOT_FOUND)
      .json({
        success: false,
        message: 'Username or password is incorrect',
        data: null
      })
  }

  // dont show the salt and password on the response
  Reflect.deleteProperty(user, 'password')
  Reflect.deleteProperty(user, 'salt')

  // generate jwt
  return res.status(HTTP_STATUS_OK)
    .json({
      success: true,
      message: 'User found',
      data: user,
    })
}

async function hashPassword(rawPassword) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(DEFAULT_SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING)
    crypto.pbkdf2(rawPassword, salt, DEFAULT_ROUNDS, DEFAULT_PASSWORD_LENGTH, DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error)
        }

        return resolve({
          salt,
          hash: hash.toString(BYTE_TO_STRING_ENCODING),
          iterations: DEFAULT_ROUNDS
        })
      })
  })
}

async function comparePassword({ account, rawPassword }) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(rawPassword, account.salt, DEFAULT_ROUNDS, DEFAULT_PASSWORD_LENGTH, DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error)
        }

        return resolve(account.password === hash.toString(BYTE_TO_STRING_ENCODING));
      })
  })
}

export { getAccountRoutes }
