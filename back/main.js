import express from "express"
import cors from "cors"
import sedesApiRoute from "./api/routes/sedes.route.js"
import paisesApiRoute from "./api/routes/paises.route.js"
import usuariosApiRoute from "./api/routes/users.route.js"
import reportesApiRoute from "./api/routes/reportes.route.js"

const app = express()

app.use(cors())
app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(sedesApiRoute)
app.use(paisesApiRoute)
app.use(usuariosApiRoute)
app.use(reportesApiRoute)

app.listen(3333, () => console.log("Funcionando... en http://localhost:3333"))