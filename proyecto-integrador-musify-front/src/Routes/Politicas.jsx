import React from "react";

const Politicas = () => {
  return (
    <div className="mt-20 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-10 h-screen p-12">
      <div>
        <h1 className="text-center text-2xl underline h-[12%] font-bold ">
          {" "}
          Términos y condiciones de alquiler de equipamiento{" "}
        </h1>
        <p className="text-xl text-justify ">
          El tiempo de alquiler se establece en un mínimo de 3 dias para
          acceder a los precios indicados. Rogamos que para alquilar por días se
          contacten con nosotros personalmente para consultar las condiciones y
          precios. <br/>
          A la entrega del Instrumento se abonará la totalidad
          correspondiente al período alquilado, más un deposito en concepto de
          garantía. Si no puedes acudir a uno de nuestros puntos asociados de
          Musify para recoger el instrumento, devolverlo, o traerlo para reparar
          / puesta a punto, los gastos de transporte iran a cargo del cliente.<br/>
          En los instrumentos de viento en los que intervengan cañas,
          compensadores, o boquillas de medidas especiales, deberán abonarse
          aparte, quedándose en propiedad para el arrendatario, por cuestiones
          obvias de salubridad.<br/>
          El arrendatario se compromete a mantener el
          instrumento en perfectas condiciones y se hace responsable de los
          daños que sufra por cualquier causa, así como del extravío o robo del
          mismo, en cuyo caso se hará cargo de la reparación o pago del importe
          total del instrumento.{" "}
        </p>
      </div>
      <div>
        <h2 className="text-center text-2xl underline h-[12%] font-bold">
          Documentación necesaria para alquilar
        </h2>
        <p className="text-xl text-justify ">
          La formalización del contrato de alquiler se llevará a cabo personal y
          físicamente en el punto asociado a Musify.<br/> En el momento de formalizar
          el contrato de arrendamiento deberá presentarse la siguiente
          documentación:
          
          <ul className="mt-5 mb-5"><br/>
            <li>🎵Fotocopia D.N.I.</li>
            <li>🎵Tarjeta utilizada para la reserva.</li>
            <li>🎵Autorización para los cargos en cuenta.</li>
          </ul>
          <br/>
          Una vez formalizado el contrato podrá retitrar el instrumento, equipo
          de audio o accesorios en persona en el punto asociado de Musify al
          momento de la reserva online. Para cualquier cambio, reparación o
          devolución deberás dirigirte al mismo punto asociado a Musify.
        </p>
      </div>
      <div>
        <h2 className="text-center text-2xl underline h-[12%] font-bold">
          Cambio de instrumentos
        </h2>
        <p className="text-xl text-justify ">
          Ya sea porque el instrumento alquilado no te guste y quieras probar
          otro tipo, o porque se te ha quedado física o cualitativamente
          pequeño, Musify te permite hacer un cambio de instrumento sin coste
          alguno.<br/> El cambio de instrumento se podrá realizar únicamente dentro
          de su misma tipología cuando se trate de un instrumento
          de gama o tamaño superior, y entre distintos tipos si
          se trata de la misma gama.<br/> Si el instrumento a cambiar
          tuviera una cuota superior, debería abonarse la parte proporcional de
          fianza.<br/> El cambio de instrumentos estará limitado a la disponibilidad
          que MusicRent tenga en ese momento.
        </p>
      </div>
    </div>
  );
};

export default Politicas;
