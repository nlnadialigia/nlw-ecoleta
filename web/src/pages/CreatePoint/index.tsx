import {LatLngExpression} from 'leaflet';
import React from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {Link} from 'react-router-dom';
import logo from "../../assets/logo.svg";
import './styles.css';

const CreatePoint: React.FC = () => {
  const position:LatLngExpression = [-20.284343378627753, -50.549331232156845]
  return (
    <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta" />
          <Link to="/" >
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form>
          <h1>Cadastro do <br />ponto de coleta</h1>

          <fieldset>
            <legend><h2>Dados</h2></legend>
            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="text" name="whatsapp" id="whatsapp" />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend><h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <MapContainer center={position} zoom={15}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}>
              </Marker>  
            </MapContainer>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select name="uf" id="uf">
                  <option value="0">Selecione uma UF</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select name="city" id="city">
                  <option value="0">Selecione uma Cidade</option>
                </select>
              </div>
            </div>            
          </fieldset>
          <fieldset>
            <legend><h2>Itens de coleta</h2>
              <span>Selecione um ou mais items abaixo</span>
            </legend>
            <ul className="items-grid">
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
              <li>
                <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste" />
                <span>Óleo de Cozinha</span>
              </li>
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
    </div>
  )
}

export default CreatePoint;