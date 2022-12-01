import { productoServices } from "../servicios/producto-servicios.js"

// Definicion de variables
const url = 'http://localhost:3000/producto/'
const contenedor = document.querySelector("tbody")
var resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const modalEditarProducto = new bootstrap.Modal(document.getElementById('modalEditarProducto'))
const formArticulo = document.querySelector("form")
let nombre;
let descripcion;
let precio;
let imagenUrl;
let seccion;
let id;
const btnCrear = document.getElementById("btnCrear")
const btnGuardar = document.getElementById("btnGuardar")
const btnGuardarE = document.getElementById("btnGuardarE")

// const btnEditar = document.getElementById("btnEditar")
let opcion = ''

btnGuardar.addEventListener("click",()=>{
    nombre = document.getElementById("nombre")
    descripcion = document.getElementById("descripcion")
    precio = document.getElementById("precio")
    imagenUrl = document.getElementById("imagenUrl")
    seccion = document.getElementById("seccion")
    productoServices.creaProdutos(nombre.value,
                                  imagenUrl.value,
                                  precio.value,
                                  descripcion.value,
                                  seccion.value,
                                  )
})

btnGuardarE.addEventListener("click",()=>{
    nombre = document.getElementById("nombreE")
    descripcion = document.getElementById("descripcionE")
    precio = document.getElementById("precioE")
    imagenUrl = document.getElementById("imagenUrlE")
    seccion = document.getElementById("seccionE")
    id = document.getElementById("idE")
    productoServices.alteraProduto(id.value, nombre.value, precio.value, descripcion.value) 
    
})



btnCrear.addEventListener("click", ()=>{
    
    descripcion = document.getElementById("descripcion")
    precio = document.getElementById("precio")
    descripcion.value = ''
    precio.value = ''
    modalArticulo.show()
})
// const mostrar = (productos) => {
//     productos.forEach(producto => {
//         resultados += `<tr>
//                             <td>${producto.id}</td>
//                             <td>${producto.description}</td>
//                             <td>${producto.price}</td>
//                             <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-primary">Borrar</a></td>
//                         </tr>
//                         `
//     })
//     contenedor.imerHtml = resultados
// }

// fetch(url)
//     .then(response => response.json())
//     .then(data => mostrar(data))
//     .catch( error => console.log(error))
        
var btnEditar;
var btnBorrar;

const render = async () =>  {
        try {
            const listaProductos = await productoServices.listaProductos()
            let ide, idb;
            listaProductos.forEach(producto => {
                ide = 'e:'+producto.id;
                idb = 'b:'+producto.id;
                resultados += `<tr>
                            <td>${producto.id}</td>
                            <td>${producto.description}</td>
                            <td>${producto.price}</td>
                            <td class="text-center">
                            <a  id=${ide} class="btnEditar btn btn-primary">Editar</a>
                            <a id=${idb} class="btnBorrar btn btn-danger">Borrar</a>
                            </td>
                            </tr>
                            `        
            })
        
            contenedor.innerHTML = resultados

            listaProductos.forEach(producto => {
                btnEditar = document.getElementById('e:'+producto.id);

                btnEditar.addEventListener("click", ()=>{
                        nombre = document.getElementById("nombreE")
                        descripcion = document.getElementById("descripcionE")
                        precio = document.getElementById("precioE")
                        seccion = document.getElementById("seccionE")
                        imagenUrl = document.getElementById("imagenUrlE")
                        id = document.getElementById("idE")
                        nombre.value = producto.name
                        descripcion.value = producto.description
                        precio.value = producto.price
                        seccion.value = producto.section
                        imagenUrl.value = producto.imageUrl
                        id.value = producto.id
                        productoServices.listarUnProduto(producto.id)
                        modalEditarProducto.show()
                }); 
                
                btnBorrar = document.getElementById('b:'+producto.id);

                btnBorrar.addEventListener("click", ()=>{
                    const resp = confirm("Desea borrar el Id="+producto.id);
                    if(resp){
                        //Borrar el Id..
                        productoServices.deleteProducto(producto.id);
                        render()
                    } 
                });
            })
        }
        catch(erro){
            console.log(erro)
        }   
}
render()
