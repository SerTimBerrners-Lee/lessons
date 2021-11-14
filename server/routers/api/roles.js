const express = require('express')
const router = express.Router()
const dbObject = require('../../db/conn')

router.get('/', async(req, res) => {
  const roles = await dbObject.getCollection('roles')
  res.send(await roles.find({}).toArray())
})

module.exports = router