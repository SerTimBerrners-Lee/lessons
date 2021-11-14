const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const dbObject = require('../../db/conn')
const _ = require('lodash')
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const jwtChecked = require('../jwt-checked')

router.get('/', async(req, res) => {
  const user_checked = await jwtChecked(req.headers)
  if(!user_checked) 
    return res.status(101).send({message: 'Пользователь не авторизован'})
  const lessons = await dbObject.getCollection('lessons')
  res.send(await lessons.find({}).toArray())
})

router.post('/', async(req, res) => {
  const userId = await jwtChecked(req.headers)
  if(!userId) 
    return res.status(101).send({message: 'Пользователь не авторизован'})

  const lessons = await dbObject.getCollection('lessons')

  const filePathArray = []
  if(req.files && req.files.files) {
    const files = req.files.files.data ? [req.files.files] : req.files.files
    for(let file of files) {
      try {
        const fileName = uuid.v4() + '__' + file.name 
        const filePath = path.resolve(__dirname, '../../', `static/`)
        if(!fs.existsSync(filePath)) 
          fs.mkdirSync(filePath,  {recursive: true})
        fs.writeFileSync(path.join(filePath, fileName), file.data)
        filePathArray.push(fileName)
      } catch(e) {
          console.error(e)
      }
    }
  }
  
  let newLessons;
  if(filePathArray.length) {
    newLessons = await lessons.insertOne({
      name: req.body.name,
      theme: req.body.theme,
      description: req.body.description,
      creater_id: userId,
      files: filePathArray
    })
  } else {
    newLessons = await lessons.insertOne({
      name: req.body.name,
      theme: req.body.theme,
      description: req.body.description,
      creater_id: userId,
    })
  }
  const getLessons = await lessons.findOne({_id: newLessons.insertedId})
  return res.status(201).send(getLessons)
})

router.put('/', async(req, res) => {
  const userId = await jwtChecked(req.headers)
  if(!userId) 
    return res.status(101).send({message: 'Пользователь не авторизован'})

  const lessons = await dbObject.getCollection('lessons')

  updateLession = await lessons.updateOne({ _id: new mongodb.ObjectId(req.body._id) }, {
    $set: {
      name: req.body.name,
      theme: req.body.theme,
      description: req.body.description,
    }
  })
  return res.status(201).send(updateLession)
})

router.delete('/:id', async(req, res) => {
  const userId = await jwtChecked(req.headers)
  if(!userId) 
    return res.status(101).send({message: 'Пользователь не авторизован'})

  const lessons = await dbObject.getCollection('lessons')
  await lessons.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send()
})

module.exports = router