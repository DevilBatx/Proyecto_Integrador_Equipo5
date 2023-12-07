import React, { useMemo } from 'react';

// Dentro del componente Suggestions
const Suggestions = (props) => {
    const options = useMemo(() => (props.results || []).map((r) => (
        <li key={r.id} onClick={() => props.onSelect(r.name)} className="cursor-pointer">
            {r.name}
        </li>
    )), [props]);

    return <ul className="absolute bg-white border border-gray-300 mt-2 z-10 transition-none">{options}</ul>;
};

export default Suggestions;