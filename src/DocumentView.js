import React, { useState } from 'react';
import axios from 'axios';
import './document.css';

axios.defaults.withCredentials = true;

const DocumentView = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [lexico, setLexico] = useState('');
  const [tokens, setTokens] = useState([]);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [reservedInfo, setReservedInfo] = useState([]);

  // Nuevo estado para visualizar el código consumido
  const [inputCode, setInputCode] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    // Actualizar el estado del código consumido
    setInputCode(command);

    axios.post('http://localhost:5000/command', { command })
      .then((response) => {
        if (response.data.message === "command executed") {
          console.log(response.data.output);
          setOutput(response.data.output);
        } else {
          console.log('Error al enviar el comando:', response.data.message);
        }
      })
      .catch((error) => {
        console.log('Error al enviar el comando:', error);
      });
      
    axios.post('http://localhost:5000/parse_code', { code: command })
      .then((response) => {
        console.log(response.data.result);
        setLexico(response.data.result);
        setTokens(JSON.stringify(response.data.tokens, null, 2));
        setReservedInfo(JSON.stringify(response.data.reserved, null, 2));
      })
      .catch((error) => {
        console.log('Error al enviar el comando:', error);
      });

    axios.post('http://localhost:5000/token_info', { code: command })
      .then((response) => {
        console.log(response.data);
        setTokenInfo(JSON.stringify(response.data.tokens, null, 2));
      })
      .catch((error) => {
        console.log('Error al obtener la información de los tokens:', error);
      });
  };

  return (
    <div>
      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <form onSubmit={handleCommand}>
              <h4 className="sub-title">Command</h4>
              <input 
                type="text" 
                className="sub-input" 
                onChange={(e) => setCommand(e.target.value)} 
                value={command}
              />
              <button type="submit" className="btn btn-primary mt-3">Send</button>
            </form>
            <h4 className="sub-title mt-5">Output</h4>
            <textarea readOnly className="sub-input" value={output} />
          </div>
        </div>
      </div>
      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <h4 className="sub-title">Resultado de Parseo</h4>
            <textarea readOnly className="sub-input" value={lexico} />
            <h4 className="sub-title mt-5">Tokens</h4>
            <textarea readOnly className="sub-input" value={tokens} />
            <h4 className="sub-title mt-5">Información de Tokens</h4>
            <textarea readOnly className="sub-input" value={tokenInfo} />
            <h4 className="sub-title mt-5">Palabras Reservadas</h4>
            <textarea readOnly className="sub-input" value={reservedInfo} />
          </div>
        </div>
      </div>
      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <h4 className="sub-title">Código Consumido</h4>
            <textarea readOnly className="sub-input" value={inputCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
