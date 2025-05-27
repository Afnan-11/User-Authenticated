// import JWT from 'jsonwebtoken'

// export const authenticateToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization
//     const token = authHeader && authHeader.split(' ')[1]

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access denied. No token provide',
//       })
//     }

//     const decoded = JWT.verify(token, process.env.JWT_kEY)

//     req.user = decoded
//     next()
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Invalid or expired token',
//       error: error.message,
//     })
//   }
// }
