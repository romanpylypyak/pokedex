import React from 'react';
import './Main.css';
import SinglePokemonCard from "../SinglePokemonCard/SinglePokemonCard"

class Main extends React.Component {
    constructor(props){
    super(props)
        this.state = { 
            data: [],
            isLoading: true,
            currentActiveCard: null,
            nextPaginationStep: 0,
            nothingToPaginate: false,
            filterState: false,
            checkedValues: null,
            filteredType: null,
            flag: false
        };
    }

    setRequestsToServer =  (url)  => {
        let arrayOfPromices = [];
        let dataCollection; 
        fetch(url,{
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }) 
            .then(response => response.json()) 
            .then(data => {
                dataCollection = data;
                generateRequests(); 
        });  
        
        const generateRequests = () => { 
            let dataArray = dataCollection.results
            let url,len
            if(dataArray.length>12 && this.state.nextPaginationStep === 0){
                len = 12  
            } else len = dataArray.length
            if(len===dataArray.length){
                this.setState({nothingToPaginate:true})
            }
            for (let i = this.state.nextPaginationStep; i < len; i++) {
                    url = `https://pokeapi.co/api/v2/pokemon/${i+1}/`
                    generatePromise(url,i);    
            }
            this.setState({nextPaginationStep: len})
            return Promise.all(arrayOfPromices)
            .then(value=> {
                this.setState({
                    data: this.state.data.concat(value),
                    isLoading: false
                })
            });
        }

        function generatePromise(url,i){
            window["pokemon"+(i)] = new Promise((resolve, reject) => {
                fetch(url)
                .then(data => {
                    resolve(data.json())
                })
            })
            arrayOfPromices.push(window["pokemon"+(i)])
        }
    }  
    componentDidMount(){
        this.setRequestsToServer('https://pokeapi.co/api/v2/type?limit=999')  
    }

    loadMorePokemons = () => {
        this.setRequestsToServer ('https://pokeapi.co/api/v2/type?limit=999')
    }

    checkifSinglePostClose = () => {
        this.setState({currentActiveCard: null})
    }


    checkPokemonType = (data) => {
            switch(data){
                case "bug":
                    return "bug";
                case "poison":
                    return "poison"
                case "fire":
                    return "fire"
                case "normal":
                    return "normal"
                case "grass":
                    return "grass"
                case "flying":
                    return "flying"
                case "water":
                    return "water"
                default: 
                break
        } 
    }

    filterVisibilityHandler = (e) => {
        if(e.target.className === "close-btn"){
            this.setState({filterState : false})
        } else {
            this.setState({filterState : true})   
        }
    }

    filterHandler = (e) => {
        if(e.target.className === "filter-submit-btn"){
            this.setState({
                filteredType : this.state.checkedValues,
                flag: true,
                filterState : false
            })
        }
        else if (e.target.className === "filter-reset-btn"){ 
            this.setState({
                checkedValues : null,
                filteredType : this.state.checkedValues,
                flag: false,
                filterState : false
            })
        }
    }

    handleInputChange = (e) => { 
        const target = e.target
        let value = e.target.value
        if(target.checked){
            this.setState({checkedValues :  value})   
        }  
    }

    getInfoAboutPokemon = (e) => { 
        const { data } = this.state
        for(let i = 0; i< data.length; i++){
            if(+e.target.dataset.id === data[i].id){
                this.setState({currentActiveCard : data[i]})
            }
        }
    }

    filterPokemons = (dataTypes) => {
        if(this.state.flag){
            if(dataTypes[0].type.name === this.state.filteredType){
                return true
            } else if(dataTypes.length>1 && dataTypes[1].type.name === this.state.filteredType){
                return true
            } else return false
        } else return true
    }

  render(){
    const { data, isLoading } = this.state
        if (isLoading) {
          return (
            <div className="Main">
                <h1 className="loading">Loading...</h1> 
          </div>
          )
        } else {
            const pokemons = data.map((data) =>
            <div className={this.filterPokemons(data.types) ? "pokemon-card pokemon-block"+data.id : "pokemon-card-disable"} data-id={data.id} key={data.id} onClick={this.getInfoAboutPokemon}>
                <img src={data.sprites.front_default} alt="img" data-id={data.id}/>
                <p className="pokemon-card pokemon-name" data-id={data.id}>{data.name}</p>
                {data.types.length === 1 ? <div className={this.checkPokemonType(data.types[0].type.name)+" pokemon-type"} data-id={data.id}>
                    <p data-id={data.id}>{data.types[0].type.name}</p>
                    </div>:
                <div className="pokemon-type-wrapper" data-id={data.id}>
                    <div className={this.checkPokemonType(data.types[0].type.name)+" pokemon-type"} data-id={data.id}>
                        <p data-id={data.id}> {data.types[0].type.name}</p>
                    </div>
                    <div className={this.checkPokemonType(data.types[1].type.name)+" pokemon-type"} data-id={data.id}>
                        <p data-id={data.id}>{data.types[1].type.name}</p>
                    </div>
                 </div>}
            </div>
          );
          return (
            <div className="Main">
                <div className="main-content-wrapper">
                    <h1>Pokedex</h1>
                    <button className="activate-filter-dropdown" onClick={this.filterVisibilityHandler}>Open Filter</button>
                    <div className={this.state.filterState ? "filter active" : "filter"}>  
                    <button className="close-btn" onClick={this.filterVisibilityHandler}>X</button>
                        <div className="filter-options">
                            <label>Bug<input type="radio" name="filter-opt-check" value="bug" onChange={this.handleInputChange}/></label>
                            <label>Poison<input type="radio" name="filter-opt-check" value="poison" onChange={this.handleInputChange}/></label>
                            <label>Grass<input type="radio" name="filter-opt-check" value="grass" onChange={this.handleInputChange}/></label>
                            <label>Fire<input type="radio" name="filter-opt-check" value="fire" onChange={this.handleInputChange}/></label>
                            <label>Normal<input type="radio" name="filter-opt-check" value="normal" onChange={this.handleInputChange}/></label>
                            <label>Water<input type="radio" name="filter-opt-check" value="water" onChange={this.handleInputChange}/></label>
                            <label>Flying<input type="radio" name="filter-opt-check" value="flying" onChange={this.handleInputChange}/></label>
                        </div>
                        <button className="filter-submit-btn" onClick={this.filterHandler}>Filter</button>
                        <button className="filter-reset-btn" onClick={this.filterHandler}>Reset</button>
                    </div>
                    <div className="pokemon-cards-wrapper">{pokemons}</div> 
                    <SinglePokemonCard  checkifSinglePostClose={this.checkifSinglePostClose} SinglePokemonCard={this.state.currentActiveCard}/>
                    <button className={this.state.nothingToPaginate ? "Load-more" : "Load-more active" }onClick={this.loadMorePokemons}>Load More</button>
                </div>
            </div>
            )
        }
    }
}

export default Main;
