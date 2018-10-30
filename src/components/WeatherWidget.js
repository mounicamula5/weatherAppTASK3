import React, {Component} from 'react';
import '../assets/index.css';
import TiLocation from "react-icons/lib/ti/location";
import iconStateMap from "../helpers/iconStateMap";
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'

class WeatherComponent extends Component {
    weather;

    render() {
        let className = "weather-widget";

        if (this.props.className !== null) {
            className += " " + this.props.className;
        }

        if (this.props.weather === null) {
            return (
                <div className={className}>
                    <ReactLoading className="center-block card-block" type='spin' color='#999999' width='100px'/>
                </div>
            );
        }

        let location = this.props.weather['title'];
        let temp = this.props.weather['consolidated_weather'][0]['the_temp'];
        let tempMin = this.props.weather['consolidated_weather'][0]['min_temp'];
        let tempMax = this.props.weather['consolidated_weather'][0]['max_temp'];
        let statusDescr = this.props.weather['consolidated_weather'][0]['weather_state_name'];
        let statusAbbr = this.props.weather['consolidated_weather'][0]['weather_state_abbr'];

        return (
            <div className={className}>
                <div className="inner">
                    <div className="location-title col-sm-12 float-left">
                        <TiLocation style={{marginTop: '-4px', marginRight: '4px'}}/>
                        <Link to={`/weather/${this.props.weather['woeid']}`} style={{color: 'white'}}>{location}</Link>
                    </div>
                    <div className="col-sm-6 text-center float-left"
                         style={{height: '60px', marginTop: '20px', paddingTop: '10px'}}>
                        <img alt="" src={iconStateMap[statusAbbr]}/>
                    </div>
                    <div className="col-sm-6 text-center main-temp float-left" style={{height: '60px', padding: 0}}>
                        <strong>{Number(temp).toFixed(1)} °C </strong>
                    </div>
                    <div className="col-sm-6 text-center float-left" style={{height: '60px', marginTop: '5px'}}>
                        {statusDescr}
                    </div>
                    <div className="col-sm-6 text-center float-left" style={{height: '60px'}}>
                        <div className="other-temp col-sm-6 float-left text-left" style={{margin: 0, padding: 0}}>
                            {Number(tempMin).toFixed(1)} °C
                        </div>
                        <div className="other-temp col-sm-6 float-left text-right" style={{margin: 0, padding: 0}}>
                            {Number(tempMax).toFixed(1)} °C
                        </div>
                        <div className="other-temp col-sm-6 float-left text-left" style={{margin: 0, padding: 0}}>
                            (min)
                        </div>
                        <div className="other-temp col-sm-6 float-left text-right" style={{margin: 0, padding: 0}}>
                            (max)
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherComponent;