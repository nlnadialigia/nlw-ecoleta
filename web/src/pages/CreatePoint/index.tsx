import axios from 'axios';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import logo from "../../assets/logo.svg";
import {Map} from '../../components/Map';
import {api} from '../../services/api';
import './styles.css';

interface Item {
  id: number,
  title: string,
  image_url: string
}

interface IBGEUFResponse {
  sigla: string,
}
interface IBGECityResponse {
  nome: string,
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState("0")
  const [selectedCity, setSelectedCity] = useState("0")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: ""
  })


  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    if (selectedUf === "0") {
      return
    } 

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
      const cities = response.data.map(city => city.nome)
      setCities(cities)
    })    
  }, [selectedUf])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value
    setSelectedUf(uf)
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value
    setSelectedCity(city)
  }

  function handleSelectMap() {
    const tag = document.getElementById("blind")
    let position = tag?.textContent

    if (!position) {
      return
    }

    return position.split(",")
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target
    setFormData({...formData, [name]: value})
  }

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
              <input type="text" name="name" id="name" onChange={handleInputChange} />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleInputChange} />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend><h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            
            <div onBlur={handleSelectMap}><Map /></div>
            
            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select name="uf" id="uf" onChange={handleSelectUf} value={selectedUf}>
                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option value={uf} key={uf}>{uf}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <select name="city" id="city" onChange={handleSelectCity} value={selectedCity}>
                  <option value="0">Selecione uma Cidade</option>
                  {cities.map(city => (
                    <option value={city} key={city}>{city}</option>

                  ))}
                </select>
              </div>
            </div>            
          </fieldset>
          <fieldset>
            <legend><h2>Itens de coleta</h2>
              <span>Selecione um ou mais items abaixo</span>
            </legend>
            <ul className="items-grid">
              {items.map(item => (
                <li key={item.id}>
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>

              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </form>
    </div>
  )
}

export default CreatePoint;