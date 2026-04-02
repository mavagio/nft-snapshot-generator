import { FC, useState } from 'react';
import { getAssetsByCollection } from './snapshot';
import './style.css';

function getQueryParam(name: string): string {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

export const App: FC<{ name: string }> = ({ name }) => {
  const [collection, setCollection] = useState(
    () => getQueryParam('collection') || '9oXJ1VL2Jy9ffvkLQuNWFJQWayUfuJ5wFPNtAcBTa3dw'
  );
  const [rpc, setRpc] = useState(() => getQueryParam('rpc'));
  const [result, setResult] = useState('Generate snapshot to see the results.');

  return (
    <div>
      <h1>Snapshot generator</h1>
      <label>Collection Address</label> <br />
      <input
        style={{ width: '400px', padding: '8px 16px' }}
        onChange={(e) => setCollection(e.target.value)}
        value={collection}
        placeholder="Enter Solana collection address"
      ></input>
      <br />
      <br />
      <label>RPC</label> <br />
      <input
        style={{ width: '400px', padding: '8px 16px' }}
        onChange={(e) => setRpc(e.target.value)}
        value={rpc}
        placeholder="https://mainnet.helius-rpc.com/?api-key=YOUR_KEY"
      ></input>
      <br />
      <br />
      <button
        onClick={() => {
          setResult('loading...');
          getAssetsByCollection(rpc, collection).then((res) => {
            setResult(res);
          });
        }}
        style={{ padding: '8px 16px' }}
      >
        Get Snapshot
      </button>
      <hr />
      <button
        onClick={() => {
          navigator.clipboard
            .writeText(result)
            .then(() => alert('Text copied to clipboard!'))
            .catch((err) => console.error('Failed to copy text: ', err));
        }}
      >
        Copy
      </button>
      <pre style={codeStyle}>{result}</pre>
    </div>
  );
};

const codeStyle: React.CSSProperties = {
  fontFamily: "'Courier New', monospace",
  fontSize: '1em',
  backgroundColor: '#f4f4f4',
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '5px',
  overflowX: 'auto',
  height: '40vh',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto', // for v
};
