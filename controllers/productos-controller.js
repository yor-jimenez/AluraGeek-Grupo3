import { productoServices } from "../servicios/producto-servicios.js";


const nuevoProducto = (name,price,imageUrl) => {
 
    const card = document.createElement("div");
    const contenido =  `
       <div>
            <img src="${imageUrl}" alt="">
            <h3 class="titulo">${name}</h3>
            <p>${price}</p>
           
        </div> 
    `;
    card.innerHTML = contenido;
    card.classList.add("card")
    return card; 
};

const productos = document.querySelector("[datos-productos]");
const consola = document.querySelector("[datos-consola]");
const diversos = document.querySelector("[datos-diversos]")

const render = async () =>  {
    try {
        const listaProductos = await productoServices.listaProductos()
        listaProductos.forEach(elemento => {
            if(elemento.section =="Star Wars"){
                productos.appendChild(nuevoProducto(elemento.name,elemento.price, elemento.imageUrl))
            }
            if(elemento.section =="Consola"){
                consola.appendChild(nuevoProducto(elemento.name,elemento.price, elemento.imageUrl))
            }
            if(elemento.section =="Diversos"){
                diversos.appendChild(nuevoProducto(elemento.name,elemento.price, elemento.imageUrl))
            }        
            
    })
    }
    catch(erro){
        console.log(erro)
    }
    
}

render()
