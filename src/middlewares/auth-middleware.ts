import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"
import { type UserToken } from "../types/user-token-types"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (authHeader == null) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const token = authHeader.split(" ")[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (error: unknown, decoded: unknown) => {
      if (error != null) {
        return res.status(403).json({ message: "Forbidden" })
      }
      const decodedToken = decoded as UserToken
      req.user = decodedToken
      next()
    }
  )
}
