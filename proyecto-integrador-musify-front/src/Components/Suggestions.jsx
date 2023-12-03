import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';

const Suggestions = (props) => {
    // console.log('Results in Suggestions:', props.results);
    const options = useMemo(() => (props.results || []).map((r) => (
        <Link to={`/details/${r.id}`} key={r.id}>
            <li>
                {r.name}
            </li>
        </Link>
    )), [props]);
    return <ul>{options}</ul>;
};
export default Suggestions;
