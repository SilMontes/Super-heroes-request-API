import React from "react";
import "./styles.css";
import Card from "../card";
import Spinner from "../spinner";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchName: "",
      heroes: [], //acá guardaremos la información de los heroes
      loading: false
    };
    //si no deseamos hacer esto para poder utilizar la funcion con this, podemos crear la funcion de abajo como una función flecha
    this.handleSearchNameChange = this.handleSearchNameChange.bind(this); //usamos el bind para que acepte setState
  }
  //podría ser función flecha
  handleSearchNameChange(event) {
    this.setState({ searchName: event.target.value }, () =>
      this.searchSuperHeroByName(this.state.searchName)
    ); //callback se ejecuta después de que realmente se haya realizado una actualización del estado
    //cada vez que cambie el nombre llamaremos a la función search superhero
  }
  ///función que realizará la solicitud
  searchSuperHeroByName(name) {
    this.setState({ loading: true }); //cuando inicie la busqueda se mostrará el espiner
    fetch("https://www.superheroapi.com/api.php/818265299101728/search/" + name) //fetch genera una promesa
      .then((response) => response.json()) //es el payload que viene de la API, transformamos la repuesta a un json, el cual genera otra promesa
      .then((data) => {
        if (data.response === "success") {
          this.setState({ heroes: data.results }); //si la solicitud es exitosa, cambiaremos el valor de heroes
        } else {
          this.setState({
            heroes: [
              {
                name: "Not Found",
                image: {
                  url:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPCgx7IaISNLxLxlLeSqhRJkQxhDrkJjUbIA&usqp=CAU"
                }
              }
            ]
          }); //si no es exitosa, se establecerá heroes a un array vacio
        }
        this.setState({ loading: false }); //cuando termine la busqueda, se esconderá el spinner
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <h1>Super Heroes</h1>
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Hero Name"
              className="form-control"
              value={this.state.searchName}
              onChange={this.handleSearchNameChange}
            />
          </div>
        </div>
        <div className="container d-flex flex-wrap justify-content-center">
          {this.state.loading && <Spinner />}
          {this.state.heroes.map((hero, index) => {
            return (
              <Card key={index} name={hero.name} imageUrl={hero.image.url} />
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
