import express from 'express'
import cors from 'cors'
import router from './router/qrRouter.js'

const app = express()
app.set('port', 4040)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)

export default app