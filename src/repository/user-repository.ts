import prisma from "../utils/prisma"
import { type Prisma } from "@prisma/client"

export const createUser = async (data: Prisma.UserUncheckedCreateInput) => {
  return await prisma.user.create({
    data,
  })
}

export const login = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}
