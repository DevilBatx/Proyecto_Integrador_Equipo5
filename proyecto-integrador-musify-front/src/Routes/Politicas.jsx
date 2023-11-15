import React from 'react'

const Politicas = () => {
  return (
    <div className=' flex flex-col w-full h-full p-28 gap-5 '>
        <h1 className='text-center text-3xl underline'> Terminos y condiciones de alquiler de equipamiento </h1>
        <p className='tracking-widest'>El tiempo mínimo de alquiler se establece en un minimo de 3 dias para acceder 
            a los precios indicados. Rogamos que para alquilar por días se contacten
             con nosotros personalmente para consultar las condiciones y precios.
             A la entrega del Instrumento se abonará la totalidad correspondiente al 
            periodo alquilado, más un deposito en concepto de garantia.
            Si no puedes acudir a uno de nuestros puntos asociados Musify para recoger 
            el instrumento, devolverlo, o traerlo para reparar / puesta a punto, los 
            gastos de transporte irán a cargo del cliente.
            En los instrumentos de viento en los que intervengan, cañas, compensadores,
            o boquillas de medidas especiales, deberán abonarse aparte, quedándose en
            propiedad para el arrendatario, por cuestiones obvias de salubridad.
            El arrendatario se compromete a mantener el instrumento en perfectas 
            condiciones y se hace responsable de los daños, que sufra por cualquier causa,
             así como del extravío o robo del mismo, en cuyo caso se hará cargo de la 
             reparación o pago del importe total del instrumento. </p>
             
             <h2 className='text-center text-3xl underline'>Documentacion necesaria para Alquilar</h2>
             <p className='tracking-widest'>La formalización del contrato de alquiler se llevará a cabo personal y 
                físicamente en el punto asociado a Musify.
                En el momento de formalizar el contrato de arrendamiento deberá     
                presentarse la siguiente documentación:
                <ul className='mt-5 mb-5'>
                <li>✅Fotocopia D.N.I.</li>
                <li>✅Tarjeta utilizada para la reserva.</li>
                <li>✅Autorización para los cargos en cuenta.</li>
                </ul>
                Una vez formalizado el contrato podrá retitrar el instrumento,
                 equipo de audio o accecorio en persona en el punto asociado de Musify al momento de la 
                 reserva online.

               Para cualquier cambio, reparación o devolución deberás dirigirte al mismo
                punto asociado a Musify.</p>
                <h2 className='text-center text-3xl underline'>Cambio de instrumento</h2>
                <p className='tracking-widest'>Ya sea porque el instrumento alquilado no te guste y quieras probar 
                 otro tipo, o porque se te ha quedado física o cualitativamente pequeño,
                 Musify te permite hacer un cambio de instrumento sin coste alguno.
                 El cambio de instrumento se podrá realizar únicamente dentro de la misma 
                 tipología de instrumento cuando se trate de un instrumento de gama o 
                 tamaño superior, y entre distintos tipos de instrumentos si se trata de 
                 instrumentos de la misma gama.
                 Si el instrumento a cambiar tuviera una cuota superior, debería abonarse 
                 la parte proporcional de fianza.
                 El cambio de instrumentos estará limitado a la disponibilidad de
                 instrumentos libres que MusicRent tenga en ese momento.</p>
      
    </div>
  )
}

export default Politicas
