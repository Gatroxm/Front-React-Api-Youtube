import React, { useEffect, useState } from "react";
import { useForm } from "./hooks/useForm";
import { getAllVideoYoutubeSearches } from "./selectors/YoutubeApiService";

const App = () => {
  const [listado, setListado] = useState([]);
  const [formValues, handleInputChange] = useForm({
    searchText: "",
  });
  const { searchText } = formValues;
  useEffect(() => {
    if(localStorage.getItem("listado")){
      setListado(JSON.parse(localStorage.getItem("listado")))
    }
  }, [])
  
  const handleSearch = (event) => {
    event.preventDefault();
    getAllVideoYoutubeSearches(searchText).then((data) => {
      if (data.data.ok) {
          localStorage.setItem('listado', JSON.stringify(data.data.data.items));
        setListado(data.data.data.items);
      }
    });
  };
  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSearch}>
            <div className="form-group row">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  name="searchText"
                  autoComplete="off"
                  value={searchText}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2">
                <button type="submit" className="btn btn-primary">
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 mt-4">
          <div className="row">
          {listado.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-12 mb-3" key={index}>
                <div className="card" >
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    className="card-img-top"
                    alt={item.snippet.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.snippet.title}</h5>
                    <p className="card-text">{item.snippet.description}</p>
                    <a target="_blank" href={`https://www.youtube.com/watch?v=${item.id.videoId}`} className="btn btn-primary">
                      Ver
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
