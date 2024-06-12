import { type User } from "../types/user-type"
import * as UserRepository from "../repository/user-repository"
import bcrypt from "bcrypt"

export const createUser = async (data: User) => {
  const { password } = data
  const hashedPassword = await bcrypt.hash(password, 12)

  const userHashed = {
    ...data,
    password: hashedPassword,
  }

  return await UserRepository.createUser(userHashed)
}

export const login = async (email: string) => {
  return await UserRepository.login(email)
}
