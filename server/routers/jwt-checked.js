const jwt = require('jsonwebtoken')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'
const dbObject = require('../db/conn')
const mongodb = require('mongodb')

async function jwtChecked(headers) {
  const users = await dbObject.getCollection('users')
  const usersData = await users.find({}).toArray()
  return new Promise((resolve, reject) => {
    jwt.verify(
      headers.authorization.split(' ')[1],
      tokenKey,
      (err, payload) => {
        if(err) reject(false)
        else if(payload) {
          let check = false
          for(let user of usersData) {
            if(user._id.toString() == payload._id) 
              check = true
          }
          resolve(payload._id)
        }
      }
    )
  })
}

module.exports = jwtChecked