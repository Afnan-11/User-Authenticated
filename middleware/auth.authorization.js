import JWT from 'jsonwebtoken'

const userAuthorization = (req, res, next) => {
  try {

    
    const authToken = req.header.authorization?.split(' ')[1]
    if (!authToken) {
      return res.status(401).send({
        success: false,
        message: 'token is missing',
      })
    }

    // Verify the token
    const verifyToken = JWT.verify(authToken, process.env.JWT_kEY)
    if (verifyToken) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized access, Please login first',
      })
    }
    req.user = verifyToken._id
    next()

  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in user authorization',
      error: error.message,
    })
  }
}

export default userAuthorization