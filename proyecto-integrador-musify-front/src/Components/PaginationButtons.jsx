import React, { useState } from 'react';

const PaginationButtons = () => {
  let [number, setNumber] = useState(1);
  let [current, setCurrent] = useState(1);

  const pages = [
    { page: number },
    { page: number + 1 },
    { page: number + 2 },
    { page: number + 3 },
  ];

  function Next() {
    if (number === 7) {
      setNumber(1);
    } else {
      setNumber(++number);
    }
  }

  function Prev() {
    number > 1 && setNumber(--number);
  }

  return (
    <div className='bg-white'>
      <div className='container mx-auto flex content-baseline items-baseline justify-center gap-6 rounded-lg p-8 drop-shadow-md lg:flex-row lg:gap-2 lg:py-10 xl:gap-6'>
        <button
          onClick={Prev}
          className='p-3 border-orange-600 px-4 rounded-full hover:bg-orange-200 hover:text-white'
        >
          <h3 className='text-sm font-medium'>Prev</h3>
        </button>

        {pages.map((pg, i) => (
          <button
            key={i}
            onClick={() => setCurrent(pg.page)}
            className={`rounded-full border-orange-500 p-3 font-semibold text-black transition ease-in-out ${
              current === pg.page ? 'bg-orange-500 text-white' : ''
            }`}
          >
            {pg.page}
          </button>
        ))}

        <button
          onClick={Next}
          className='p-3 border-orange-600 px-4 rounded-full hover:bg-orange-200 hover:text-white'
        >
          <h3 className='text-sm font-medium'>Next</h3>
        </button>
      </div>
    </div>
  );
};

export default PaginationButtons;

