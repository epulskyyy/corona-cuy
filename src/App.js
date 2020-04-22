import React from 'react';
import { Cards, Charts, CountryPicker } from './Components';
import styles from './App.module.css';
import coronaImage from './images/logo.gif';
import { fetchDataCorona } from './Action/DataCorona';
import { connect } from 'react-redux';
class App extends React.Component {
  componentDidMount() {
    this.props.fetchDataCorona();
  }

  render() {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards />
        <CountryPicker />
        <Charts />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataCorona: state.dataCorona,
  };
};

export default connect(mapStateToProps, { fetchDataCorona })(App);
