//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];



cargarEventListeners();
function cargarEventListeners(){
//cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () =>{
        console.log("vaciando carrito");
        articulosCarrito = [];// reseteando el arreglo

        limpiarHTML(); //eliminar todo el HTML
    })
}

//funciones
function agregarCurso(e){
    e.preventDefault();
    //alert("agregaste un curso al carrito");

        if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        Swal.fire({
            title: "¿Quieres agregar este curso?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, agregar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                leerDatosCurso(cursoSeleccionado);
                Swal.fire("Agregado", "", "success");
            } else {
                Swal.fire("Agregar cancelado", "", "info");
            }
        });        

    }
}

//elimina un curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);

    if(e.target.classList.contains("borrar-curso")){


        Swal.fire({
            title: "¿Quieres eliminar este curso?",
            text: "Procederás a eliminar el curso del carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {

                const cursoId = e.target.getAttribute("data-id");

                // Resta del carrito el curso seleccionado por cantidad
                idx = articulosCarrito.findIndex( curso => curso.id === cursoId);
                articulosCarrito[idx].cantidad --;
                //Elimina del arreglo por el id cuando la cantidad llegue a 0
                if (!articulosCarrito[idx].cantidad) {            
                articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
                }   
        
                //elimina del arreglo de articulosCarrito por el data-id
                //articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
            
                carritoHTML(); //iterar sobre el carrito y mostrar su HTML

                Swal.fire("Eliminado", "", "success");
            } else {
                Swal.fire("Eliminación cancelada", "", "info");
            }
        });        



        

          
        }
    }



//lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
    //console.log(curso);

    //crear un objeto con contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad:1
    }


    //revisa si un elemento ya está en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            }else{
                return curso;//retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //console.log(articulosCarrito);
    carritoHTML();

}

//muestra el carrito de compras en el HTML

function carritoHTML(){

    //limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        //console.log(curso);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src = "${curso.imagen}" width = "100">

            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class = "borrar-curso" data-id = "${curso.id}"> x </a>
            </td>
        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = ' ';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

