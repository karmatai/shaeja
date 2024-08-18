import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src={pdfUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="PDF Viewer"
            />
        </div>
    );
};

export default PdfViewer;