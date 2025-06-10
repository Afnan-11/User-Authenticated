import express, { json } from 'express'
import { User } from '../model/user.model.js'
import { comparePassword, hashedPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
// import { user } from '@nextui-org/react'
// import { hashPassword } from '../helpers/authHelper.js'

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { firstName, email, password } = req.body

    if (!firstName) {
      return res.send({ message: 'Please enter your name' })
    }
    if (!email) {
      return res.send({ meassage: 'Please enter your email' })
    }
    if (!password) {
      return res.send({ meassage: 'Please enter your Password' })
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
      return res.status(200).send({
        success: false,
        message: 'Email already exists',
      })
    }

    const hashPassword = await hashedPassword(password)

    let saveUser = await new User({
      firstName,
      email,
      password: hashPassword,
    }).save()

    // console.log('save user', saveUser)

    res.status(201).send({
      success: true,
      message: 'You Registered Sucessfully',
      saveUser,
    })

    // res.status(200).send({
    //   success: true,
    //   meassage: 'Registration Sucessfully',
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error in registration',
      error,
    })
  }
}

// Login Controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        meassage: 'Email or Password is missing',
      })
    }

    let userfind = await User.findOne({ email })

    if (!userfind) {
      return res.status(404).send({
        success: false,
        message: 'No such record available , Please register first',
      })
    }

    const match = await comparePassword(password, userfind.password)

    if (!match) {
      return res.status(401).send({
        success: false,
        message: 'Invalid Password',
      })
    }

    // Generate token
    const token = await JWT.sign({ _id: userfind._id }, process.env.JWT_kEY, {
      expiresIn: '3d',
    })

    

    res.status(200).send({
      success: true,
      message: 'Successfully Login',
      userfind: {
        email: userfind.email,
        token,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'error in Login',
      error,
    })
  }
}
