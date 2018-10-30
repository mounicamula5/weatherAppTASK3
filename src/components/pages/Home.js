import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import {connect} from "react-redux";
import WeatherComponent from "../WeatherWidget";
import {bindActionCreators} from "redux";
import {fetchLocation} from "../../actions/weatherActions"
import {fetchSearch} from "../../actions/weatherActions";

const homeWoeids = [
    2344116, // istambul
    638242, // Berlin
    44418, // London
    565346, // Helsinki
    560743, // Dublin
    9807, // Vancouver
];

class Home extends Component {

    constructor(props) {
        super(props);
        let searchInput = "";

        if (window.location.hash.match(/#\/search\//)) {
            searchInput = window.location.hash.replace('#/search/', '');
        }

        if (searchInput !== '') {
            this.props.fetchSearch(searchInput.toLowerCase());
        } else {
            for (let i = 0; i < homeWoeids.length; i++) {
                this.props.fetchLocation(homeWoeids[i]);
            }
        }

        this.state = {searchInput: searchInput};
    }

    componentWillMount() {

    }

    static onSearch(e) {
        e.preventDefault();

        let search = document.getElementById('search-input').value;
        window.location.href = `/#/search/${search}`;
        window.location.reload();
    }

    render() {
        let whatShow = null;

        if (this.props.loading) {
            whatShow = (
                <div className="card-block text-center">
                    <ReactLoading className="center-block" type='spin' color='#999999' width='100px'/>
                </div>
            );
        } else if (Object.keys(this.props.locations).length) {
            whatShow = Object.keys(this.props.locations).map((woeid) => {
                let weather = this.props.locations[woeid];
                return <WeatherComponent key={woeid} className="card-block col-sm-4" weather={weather}/>;
            });
        } else {
            whatShow = (
                <div className="card-block text-center">
                    No results were found. Try changing the keyword!
                </div>
            );
        }

        return (
            <div className="card-block">
                <div className="col-sm-10 center-block">
                    <nav className="navbar navbar-light bg-faded">
                        <a className="navbar-brand">
                            <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30"
                                 height="30"
                                 className="d-inline-block align-top" alt=""/>
                            &nbsp;&nbsp;Meta Weather
                        </a>
                    </nav>
                </div>
                <div className="col-sm-10 center-block">
                    <nav className="navbar navbar-light bg-faded">
                        <form onSubmit={Home.onSearch} className="form-inline text-right">
                            <input id="search-input" className="form-control mr-sm-2" type="text"
                                   placeholder="Search" defaultValue={this.state.searchInput}/>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);