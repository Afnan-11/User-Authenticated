import bcrypt from 'bcrypt'

export const hashedPassword = async (password) => {
  const saltRound = 10
  const hashedPassword = await bcrypt.hash(password, saltRound)
  return hashedPassword
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}
