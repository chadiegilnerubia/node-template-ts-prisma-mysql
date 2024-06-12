import { type Request, type Response } from "express"
import * as UserService from "../../services/auth-service"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register = async (req: Request, res: Response) => {
  try {
    const { email, first_name, last_name, password } = req.body
    const user = await UserService.createUser({ email, first_name, last_name, password })

    res.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await UserService.login(email)

    if (user == null || user == undefined) {
      return res.status(400).json({ message: "User not found" })
    }

    const comparePassword = await bcrypt.compare(password, user?.password)

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid Credentials" })
    }

    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      }
    )
    res.cookie("jwt", access_token, { httpOnly: true })
    res.json({
      access_token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt")
    res.json({ message: "Logout successful" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}
