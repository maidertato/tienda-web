import React from 'react';

const Pie = ({ contenido }) => {
  return (
    <footer>
      <div className="text-center py-3 border-top mt-4">
        {contenido}
      </div>
    </footer>
  );
};

export default Pie;