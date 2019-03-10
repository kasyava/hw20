import React from 'react';



const CountryInfo = (props) =>{


    if(!props.selectCountry){
        return(

            <div className="CountryInfo">
                <p>Select country</p>
            </div>
        );
    }
    else{

        return(

            <div className="CountryInfo">
                <div className='Info'>
                    <h1>{props.selectCountry}</h1>
                    <p>Capital: {props.countryCapital}</p>
                    <p>Population: {props.countryPopulation}</p>
                    <p>Borders with:</p>
                    <ul>
                        {props.countryBorders.length ? props.countryBorders.map((countryName, id) => (
                            <li key={id}>{countryName}</li>
                        )) : " Has no common borders"}
                    </ul>

                </div>
                <div className="Flag">
                    <img src={props.countryFlag} alt="Country flag" width='200px'/>
                </div>


            </div>

        );
    }

};

export default CountryInfo;