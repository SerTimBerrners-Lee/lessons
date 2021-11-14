const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()
const dbObject = require('../../db/conn')
const _ = require('lodash');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

router.get('/', async(req, res) => {
  const roles = await dbObject.getCollection('roles')
  res.send(await roles.find({}).toArray())
})

router.post('/', async(req, res) => {
  if(_.isEmpty(req.body)) 
    return res.status(204).send({message: 'Запрос пустой'})
  const users = await dbObject.getCollection('users')
  const findUser = await users.findOne({email: req.body.email})
  if(!findUser) 
    return res.status(404).send({message: 'Пользователь не найден'})

  const passwort_check = await bcrypt.compare(req.body.password, findUser.password)
  if(!passwort_check)
    return res.status(404).send({message: 'Введен не верный пароль'})

  return res.status(201).send(
    {
      jwt: jwt.sign({_id: findUser._id}, tokenKey),
      _id: findUser._id,
      login: findUser.login,
      role: findUser.role
    })
})

router.post('/registration', async(req, res) => {
  if(_.isEmpty(req.body)) 
    return res.status(204).send({message: 'Запрос пустой'})
  const users = await dbObject.getCollection('users')
  const findUser = await users.findOne({email: req.body.email})

  if(findUser) 
    return res.status(400).send({message: 'Пользователь с таким email уже существует'})
  const role = await dbObject.getCollection('roles')
  const findRole = await role.findOne({_id: new mongodb.ObjectId(req.body.role_id)})
  if(!findRole)
    return res.status(400).send({message: 'Выбранной роли не существует'})

  const hashPassword = await bcrypt.hash(req.body.password, 5);
  const new_user = await users.insertOne({
    email: req.body.email, 
    login: req.body.login,
    password: hashPassword,
    role: findRole
  })
  
  if(!new_user)   
    return res.status(400).send({message: 'Не удалось создать пользователя'}) 

  return res.status(201).send(
    {
      jwt: jwt.sign({_id: new_user.insertedId}, tokenKey),
      _id: new_user.insertedId,
      login: req.body.loginm,
      role: findRole
    })
})

router.delete('/:id', async(req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
  res.status(200).send()
})

module.exports = router