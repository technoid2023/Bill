import React from 'react';

function EmbeddedComponent() {
  return (
    <div>
      <iframe
        src="http://10.173.45.213:3001/credit-invoice"
        title="Embedded Component"
        width='100%'
        height='650'
      />
    </div>
  );
}

export default EmbeddedComponent;
