// import { productoServices } from "../../servicios/producto-servicios.js"

// Definicion de variables
const url = 'http://localhost:3000/producto/'
const contenedor = document.querySelector("tbody")
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector("form")
const descripcion = document.getElementById("descripcion")
const precio = document.getElementById("precio")
let opcion = ''

btnCrear.addEventListener("click", ()=>{
    descripcion.value = ''
    precio.value = ''
    modalArticulo.show()
    opcion = "crear"
})
const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.description}</td>
                            <td>${producto.price}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-primary">Borrar</a></td>
                        </tr>
                        `
    })
    contenedor.imerHtml = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch( error => console.log(error))
        
       