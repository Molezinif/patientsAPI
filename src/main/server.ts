import app from './config/app'

const PORT = 3333
app.listen(PORT, () => {
  console.log(`
    🚀 Server ready at: http://localhost:${PORT}
  `)
})
