import React, {Component} from 'react';
import '../assets/index.css';
import ReactLoading from 'react-loading';
import iconStateMap from "../helpers/iconStateMap";

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

class OtherDaysWeatherWidget extends Component {
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

        let weekDaysItems = this.props.weather['consolidated_weather'].map((cWeather, key) => (
            <li className="week-day col-sm-2 float-left" key={key}>
                <div className="week-day-item week-day-title">
                    {weekDays[(new Date(cWeather['applicable_date'])).getDay()]}
                </div>
                <div className="week-day-item week-day-icon" title={cWeather['weather_state_name']}>
                    <img alt="" src={iconStateMap[cWeather['weather_state_abbr']]}/>
                </div>
                <div className="week-day-item week-day-temp">{Number(cWeather['the_temp']).toFixed(1)}°C</div>
                <div className="week-day-item week-day-temps">
                    <span className="float-left">{Number(cWeather['min_temp']).toFixed(1)}°</span>
                    <span className="float-right">{Number(cWeather['max_temp']).toFixed(1)}°</span>
                </div>
            </li>
        ));

        return (
            <div className={className}>
                <ul className="inner week-days col-sm-12">
                    {weekDaysItems}
                </ul>
            </div>
        );
    }
}

export default OtherDaysWeatherWidget;