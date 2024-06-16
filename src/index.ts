import server from "./server";
import colors from 'colors'

const port = process.env.PORT || 4000

//Puerto
server.listen(port, () => {
    console.log( colors.cyan.bold(`REST API en el puerto: ${port}`))
})
