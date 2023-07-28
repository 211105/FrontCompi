import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './document.css';

axios.defaults.withCredentials = true;

const DocumentView = () => {
  const [command1, setCommand1] = useState('');
  const [command2, setCommand2] = useState('');
  const [command3, setCommand3] = useState('');
  const [output, setOutput] = useState('');
  const [lexico, setLexico] = useState('');
  const [tokens, setTokens] = useState([]);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [reservedInfo, setReservedInfo] = useState([]);
  const [isCommand1Executed, setIsCommand1Executed] = useState(false);
  const [isCommand2Executed, setIsCommand2Executed] = useState(false);

  // Nuevo estado para visualizar el código consumido
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    if (isCommand1Executed) {
      // Ejecutar el "Command 2" si "Command 1" ha sido ejecutado con éxito
      axios.post('http://localhost:5000/command', { command: command2 })
        .then((response) => {
          if (response.data.message === "command executed") {
            console.log(response.data.output);
            setOutput(response.data.output);
            // Marcar el "Command 2" como ejecutado
            setIsCommand2Executed(true);
          } else {
            console.log('Error al enviar el Command 2:', response.data.message);
          }
        })
        .catch((error) => {
          console.log('Error al enviar el Command 2:', error);
        });
    }
  }, [isCommand1Executed, command2]);

  useEffect(() => {
    if (isCommand2Executed) {
      // Ejecutar el "Command 3" si "Command 2" ha sido ejecutado con éxito
      axios.post('http://localhost:5000/command', { command: command3 })
        .then((response) => {
          if (response.data.message === "command executed") {
            console.log(response.data.output);
            setOutput(response.data.output);
          } else {
            console.log('Error al enviar el Command 3:', response.data.message);
          }
        })
        .catch((error) => {
          console.log('Error al enviar el Command 3:', error);
        });
    }
  }, [isCommand2Executed, command3]);

  const handleCommand = (e, command) => {
    e.preventDefault();
    // Actualizar el estado del código consumido
    setInputCode(command);

    axios.post('http://localhost:5000/command', { command })
      .then((response) => {
        if (response.data.message === "command executed") {
          console.log(response.data.output);
          setOutput(response.data.output);
          // Marcar el "Command 1" como ejecutado
          setIsCommand1Executed(true);
        } else {
          console.log('Error al enviar el Command 1:', response.data.message);
        }
      })
      .catch((error) => {
        console.log('Error al enviar el Command 1:', error);
      });
  };

  const handleCommand1 = (e) => {
    e.preventDefault();
    // Actualizar el estado del código consumido
    setInputCode(command1);

    axios.post('http://localhost:5000/command', { command: command1 })
      .then((response) => {
        if (response.data.message === "command executed") {
          console.log(response.data.output);
          setOutput(response.data.output);
          // Marcar el "Command 1" como ejecutado
          setIsCommand1Executed(true);
        } else {
          console.log('Error al enviar el Command 1:', response.data.message);
        }
      })
      .catch((error) => {
        console.log('Error al enviar el Command 1:', error);
      });
  };

  return (
    <div>
      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <form onSubmit={handleCommand1}>
              <h4 className="sub-title">Command 1</h4>
              <input
                type="text"
                className="sub-input"
                onChange={(e) => setCommand1(e.target.value)}
                value={command1}
              />
              <button type="submit" className="btn btn-primary mt-3">Send</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <form onSubmit={(e) => handleCommand(e, command2)} disabled={!isCommand1Executed}>
              <h4 className="sub-title">Command 2</h4>
              <input
                type="text"
                className="sub-input"
                onChange={(e) => setCommand2(e.target.value)}
                value={command2}
                disabled={!isCommand1Executed}
              />
              <button type="submit" className="btn btn-primary mt-3" disabled={!isCommand1Executed}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-color2">
        <div className="row">
          <div className="col-12 col-lg-6 mt-5">
            <form onSubmit={(e) => handleCommand(e, command3)} disabled={!isCommand2Executed}>
              <h4 className="sub-title">Command 3</h4>
              <input
                type="text"
                className="sub-input"
                onChange={(e) => setCommand3(e.target.value)}
                value={command3}
                disabled={!isCommand2Executed}
              />
              <button type="submit" className="btn btn-primary mt-3" disabled={!isCommand2Executed}>
                Send
              </button>
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