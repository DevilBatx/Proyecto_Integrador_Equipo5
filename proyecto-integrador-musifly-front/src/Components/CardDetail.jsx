import React from 'react';
import Bateria1 from '../assets/Products/bateria2.jpg'
import arrow from '../assets/Products/arrow.png'

             //#4
//Visualizar un bloque de header el cual deberá cubrir el 100 % del ancho de la pantalla.	✔							
//El título del producto deben estar alineados a la izquierda.	✔							
//La flecha para volver atrás debe estar alineada a la derecha.		✔						
//En el body debe estar el texto descriptivo del producto y sus imágenes.		✔						
			      //#5						
//Debe presentar un bloque al 100 % del ancho del contenedor que incluye 5 imágenes.	✔												
//La imagen principal debe estar posicionada en la mitad izquierda del bloque de imágenes.	✔												
//En la versión desktop, una grilla de 2 filas y 2 columnas debe estar en la mitad derecha del bloque donde se visualizarán las 4 imágenes restantes. ✔													
//El bloque debe incluir en su región inferior derecha el texto “Ver más”, el cual, permitirá acceder a un componente para ver todas las imágenes disponibles del producto.	✔												
//La galería debe ser responsiva a los diferentes dispositivos como mobile y tablet.	✔												



const CardDetail = () => {

  return (
   <>
     <div className='p-20 mt-5 '>
        <div className='flex flex-1 justify-between'>   
           <h1 className='text-left text-xl text-orange-500 font-bold py-5'>MAPEX VE5294FTVH BATERÍA ACÚSTICA SERIE VENUS 5 CUERPOS CON FIERROS</h1>
             <button onClick={() => router.back()}
               className='mr-25 text-xs font-semibold uppercase transition ease-in-out hover:text-sky-500'
                >  <img src={arrow}></img> </button> 
         </div>

        <div className=' grid h-full w-full grid-cols-2 gap-3 pt-4 md:grid-cols-4'>
          <div className='col-span-2 row-span-2 aspect-[4/2.8] border border-gray-400 rounded-md'>
              <img
               alt="gallery"
               class="block h-full w-full rounded-lg object-cover object-center "
               src={Bateria1}/>
           </div>
              
          <div className=' aspect-[4/2.8] border border-gray-400 rounded-md'>
              <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src={Bateria1} />
            </div>

          <div className=' aspect-[4/2.8] border border-gray-400 rounded-md'>
              <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src={Bateria1} />
            </div>
              
          <div className=' aspect-[4/2.8] border border-gray-400 rounded-md'>
             <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src= {Bateria1}/>
            </div>

          <div className=' border border-gray-400 aspect-[4/2.8] rounded-md'>
              <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src={Bateria1} />
            </div>
        </div>

        <div className='text-right p-5'>
            <button className="bg-white hover:bg-gray-100  text-orange-500 font-bold py-1 px-2 md:py-2 md:px-4 border border-gray-400 rounded-full shadow text-sm md:text-base">ver mas</button>
        </div>   

        <h2 className='text-left text-orange-500 font-bold p-5'>DESCRIPCION:</h2>
            <p>Mapex Venus es el kit de batería completo que ofrece un gran sonido
               y una apariencia dinámica con todo lo necesario para comenzar su viaje
               de "Drummer for Life". Los cascos de álamo con bordes de soporte
               Mapex SONIClear™ para una afinación rápida y sin esfuerzo, y las
               profundidades de tamaño de tom más cortas brindan un tono completo
               instantáneo y permiten una configuración y posicionamiento de tom más fáciles.
               El kit de batería completo incluye 5 tambores con caja, herrajes y trono.</p>

        <h4 className='text-left text-orange-500 font-bold p-5' >CARACTERÍSTICAS:</h4>
            <ul>
                <li>Kit de batería completo con hardware Toms montados en bombo para tocar cómodamente y configurar fácilmente</li>
                <li>Capas de álamo para un cálido sonido de tambor completo.</li>
                <li>Bordes de apoyo SONIClear para un sonido de calidad y fácil afinación</li>
            </ul>

        <h4 className='text-left text-orange-500 font-bold p-5'>ESPECIFICACIONES:</h4>
            <ul>
                <li> Bordes de rodamiento SONIClear™</li>
                <li> Capas de álamo de 9 capas de 7,2 mm</li>
                <li> Tambor a juego</li>
                <li>Parches Remo UC</li>
                <li>Brillo de galaxia negra</li>
                <li>Cromo</li>
             </ul>
      </div>
   </>
  )
}

export default CardDetail
