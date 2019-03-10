import React, {Component} from 'react';

import CountryInfo from '../../Components/CountryInfo/CountryInfo';


class CountryList extends Component{
    constructor (props){
        super(props);

        this.state = {
            countryList: [],
            selectCountry: '',
            countryBorders: '',
            countryFlag: '',
            countryCapital:'',
            countryPopulation: ''
        }

    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response =>{
                if(response.ok){
                    return  response.json();
                }
                throw new Error('The request failed')
            }).then(result => {
            this.setState({countryList: result});
        })
    }



    change = (e) =>{


        let selectCountryId=null;
        for (let node of e.target.children) {
            if (node.value === e.target.value) {
                selectCountryId = node.getAttribute('id');
                break;
            }
        }

        this.setState({selectCountry: e.target.value});

        this.setState({countryFlag: this.state.countryList[selectCountryId].flag});

        this.setState({countryCapital: this.state.countryList[selectCountryId].capital});
        this.setState({countryPopulation: this.state.countryList[selectCountryId].population});

        //console.log(this.state.countryList[selectCountryId].borders);

        let countryBorders = this.state.countryList[selectCountryId].borders.map((a3Code) => {
            return new Promise((answer) => {
                fetch(`https://restcountries.eu/rest/v2/alpha/${a3Code}?fields=name`)
                    .then(response =>{
                        if(response.ok){
                            return  response.json();
                        }
                        throw new Error('The request failed')
                    })
                    .then(result => {
                        answer(result.name);
                })
            });
        });
        Promise.all(countryBorders).then(borderName => {
             this.setState({countryBorders: borderName});
        });

    };


    render(){

        let countryList = this.state.countryList.map((country, id)=>(

            <option key={id} id={id} value={country.name} >

                {country.name}

            </option>
        ));
        let size = 40;
        if (this.state.countryList.length<50) size = this.state.countryList.length;


        return(
            <div >
                <select className='CountryList' name="countryList" id="countryList" size={size} onChange={this.change}>

                    {countryList}

                </select>

                    <CountryInfo
                        selectCountry={this.state.selectCountry}
                        countryBorders={this.state.countryBorders}
                        countryFlag={this.state.countryFlag}
                        countryCapital={this.state.countryCapital}
                        countryPopulation={this.state.countryPopulation}
                    />
            </div>
        );
    }

}

export default CountryList