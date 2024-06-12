import app from "./app"

const PORT = process.env.PORT ?? 5000
const server = app

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
