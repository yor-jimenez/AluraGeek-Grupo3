import { usuarioServices } from "../servicios/usuario-servicios.js";

// const username = document.getElementById("username").value;
// const password = document.getElementById("password").value;
const button = document.getElementById("button");

button.addEventListener('click', (e) => {
    e.preventDefault();
    // const data = {
    //     username: username.value,
    //     password: password.value,
    // }
    validar().then((data)=>{
        console.log(data);
        if(!data){
            alert("Usuario invalido");
        }else{
            window.location.href = "../index.html";
        };
    });
    
    }
)

// const nuevoUusuario = (name,email,password) => {
 
//     const card = document.createElement("div");
//     const contenido =  `
//        <div>
//             <p>${nombre}</p>
//             <p>${email}</p>
//             <p>${password}</p>
//         </div> 
//     `;
//     card.innerHTML = contenido;
//     card.classList.add("card")
//     return card; 
// };


const validar = async () =>  {
    try {
        const listaUsuarios = await usuarioServices.listaUsuarios()
        let sw = 0
        
        listaUsuarios.forEach(elemento => {
            if(elemento.email==document.getElementById("username").value &
              elemento.password==document.getElementById("password").value){
                sw = 1;
                return sw;
            }      
         })
         return sw;
    }
    catch(erro){
        console.log(erro)
        return 0;
    }
    
}
