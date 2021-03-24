import React from 'react';
import './SinglePokemonCard.css';

class SinglePokemonCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isClosed: false
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps!==this.props){
            this.setState({isClosed:false})
        }
    }

    closeModalHandler = () => {
        this.setState({isClosed: true})
        this.props.checkifSinglePostClose(true)
    }
    checkDigitsLength = (digit) => {
        let digitToString = digit+""
        let digitLength = digitToString.length
        switch(digitLength){
            case 1:
                return "00"
            case 2:
                return "0"
            case 3: 
                return ""
            default:
                console.log("Some error in checkDigitLength func")
            break
        }
    }

  render(){
      const { SinglePokemonCard } = this.props
      if(this.props.SinglePokemonCard!==null){
          return (
            <div className="SinglePokemonCard">
              <div className={this.state.isClosed ? "singe-pokemon-info" : "singe-pokemon-info active"}>
                    <button className="close-btn" onClick={this.closeModalHandler}>X</button>
                    <img src={SinglePokemonCard.sprites.front_default} alt="img"/>
                    <p className="singe-pokemon-info-name">{SinglePokemonCard.name+" #"+this.checkDigitsLength(SinglePokemonCard.id)+SinglePokemonCard.id}</p>
                 <div className="pokemon-skills">
                 {SinglePokemonCard.types.length === 1 ? 
                 <div className="pokemon-type-row" >
                    <p>Type</p>
                    <div className="type-wrapper">
                        <p>{SinglePokemonCard.types[0].type.name}</p>
                    </div>
                </div>:
                 <div className="pokemon-types-row">
                     <p>Type</p>
                     <div className="types-wrapper">
                         <p> {SinglePokemonCard.types[0].type.name}</p>
                         <p>{SinglePokemonCard.types[1].type.name}</p>
                    </div>
                 </div>}
                     <div className="pokemon-attack pokemon-info-row"><p>Attack</p><p>{SinglePokemonCard.stats[1].base_stat}</p></div>
                     <div className="pokemon-defence pokemon-info-row"><p>Defence</p><p>{SinglePokemonCard.stats[2].base_stat}</p></div>
                     <div className="pokemon-hp pokemon-info-row"><p>HP</p><p>{SinglePokemonCard.stats[0].base_stat}</p></div>
                     <div className="pokemon-sp-attack pokemon-info-row"><p>SP Attack</p><p>{SinglePokemonCard.stats[3].base_stat}</p></div>
                     <div className="pokemon-sp-defence pokemon-info-row"><p>SP Defence</p><p>{SinglePokemonCard.stats[4].base_stat}</p></div>
                     <div className="pokemon-speed pokemon-info-row"><p>Speed</p><p>{SinglePokemonCard.stats[5].base_stat}</p></div>
                     <div className="pokemon-weight pokemon-info-row"><p>Weight</p><p>{SinglePokemonCard.weight}</p></div>
                     <div className="pokemon-total-moves pokemon-info-row"><p>Total Moves</p><p>{SinglePokemonCard.moves.length}</p></div>
                 </div>
             </div>   
           </div>
          )
       } else {
           return (
            <div className="SinglePokemonCard">
            </div>
           )
        }
    }
}

export default SinglePokemonCard;
