import React, { useState } from 'react';

function App() {
  const [svgData, setSvgData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectFile = async () => {
    setError('');
    setSvgData(null);
    const filePath = await window.electronAPI.openWMF();
    if (!filePath) return;
    setLoading(true);
    const { svg, error } = await window.electronAPI.convertWMFtoSVG(filePath);
    setLoading(false);
    if (svg) setSvgData(svg);
    else setError(error || 'Conversion failed');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>WMF → SVG Viewer (Offline)</h1>
      <button onClick={handleSelectFile}>Choose WMF File</button>
      {loading && <p>Converting...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {svgData && (
        <div style={{ marginTop: 24 }}>
          <h2>SVG Preview:</h2>
          <div
            style={{ border: '1px solid #ddd', padding: 10, background: '#fafafa' }}
            dangerouslySetInnerHTML={{ __html: svgData }}
          />
        </div>
      )}
    </div>
  );
}

export default App;