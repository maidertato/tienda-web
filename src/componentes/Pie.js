import React from 'react';

const Pie = ({ contenido, className }) => {
    return (
        <footer className={className}>
            {contenido}
        </footer>
    );
};

export default Pie;