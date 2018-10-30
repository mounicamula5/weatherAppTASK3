import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {connect} from "react-redux";
import WeatherComponent from "../WeatherWidget";
import OtherDaysWeatherWidget from "../OtherDaysWeatherWidget";
import {bindActionCreators} from "redux";
import {fetchLocation} from "../../actions/weatherActions"
import {fetchSearch} from "../../actions/weatherActions";

class Detailed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            woeid: this.props.match.params.woeid
        };

        if (typeof(this.props.locations[this.state.woeid]) === 'undefined') {
            this.props.fetchLocation(this.state.woeid);
        }
    }

    render() {
        let whatShow = null;

        if (this.props.loading) {
            whatShow = (
                <div className="card-block text-center">
                    <ReactLoading className="center-block" type='spin' color='#999999' width='100px'/>
                </div>
            );
        } else if (this.props.locations[this.state.woeid] !== null) {
            let weather = this.props.locations[this.state.woeid];
            whatShow = (
                <div className="col-sm-10 center-block">
                    <WeatherComponent className="card-block col-sm-5" weather={weather}/>
                    <OtherDaysWeatherWidget className="card-block col-sm-7" weather={weather}/>
                </div>
            );
        } else {
            whatShow = (
                <div className="card-block text-center">
                    Location Not Found!
                </div>
            );
        }

        return (
            <div className="card-block">
                <div className="col-sm-10 center-block">
                    <nav className="navbar navbar-light bg-faded">
                        <a className="navbar-brand" href="/">
                            <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30"
                                 height="30"
                                 className="d-inline-block align-top" alt=""/>
                            &nbsp;&nbsp;Meta Weather
                        </a>
                    </nav>
                </div>
                <div className="col-sm-10 center-block">
                    {whatShow}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    locations: state.weatherReducer.locations,
    loading: state.weatherReducer.loading
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({fetchLocation, fetchSearch}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Detailed);