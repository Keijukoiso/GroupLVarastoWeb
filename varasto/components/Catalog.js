import './Catalog.css';
import sakset from "../kuvat/sakset.jpg"

/*
Jatkokehitys:
Taulukko pitää muokata niin, että tiedot siihen tulevat kannasta.
*/



export default function Catalog () {

    const tuotteet = [
        {"tuote" : "sakset", "maara" : "2", "lisatietoa" : "Tarinoi tähän"},
        {"tuote" : "sakset", "maara" : "2", "lisatietoa" : "Tarinoi tähän"},
        {"tuote" : "sakset", "maara" : "2", "lisatietoa" : "Tarinoi tähän"},
        {"tuote" : "sakset", "maara" : "2", "lisatietoa" : "Tarinoi tähän"},
      ];
      
	return (
        <div class="sivu">
            <Kortit t={tuotteet}/>
        </div>
    
	
);
}  


const Kortit = (props) => {

    const data = props.t.map((x,i) => {
      return <div key={i} class="card"> 
            <img src={sakset} alt="sakset" id="sakset"/>
            <p><button>{x.tuote}</button></p>
            </div>
    });

    return (data);
  }


  