import jwt from 'jsonwebtoken'

export function checkToken(req, res, next) {
  const authHeader = req.headers.authorization

  // Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 0,
      msg: 'Unauthorized: No token provided'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY)

    req.body.id = decoded.id
    next()
  } catch (err) {
    return res.status(403).json({
      status: 0,
      msg: 'Unauthorized: Invalid or expired token'
    })
  }
}
