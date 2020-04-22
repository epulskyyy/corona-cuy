import React, { useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';
import { fetchDailyData } from '../../Action/DataCorona';
import { connect } from 'react-redux';
const Charts = ({ data, country, fetchDailyData, dailyData }) => {
  useEffect(() => {
    fetchDailyData();
  }, [fetchDailyData]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5',
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart =
    data !== null ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)',
              ],
              data: [
                data.confirmed.value,
                data.recovered.value,
                data.deaths.value,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null;
  if (data === null) {
    return 'LOARDING';
  }
  if (dailyData.length === 0) {
    return <h1>Data Not Found!</h1>;
  }
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.dataCorona.data,
    country: state.dataCorona.country,
    dailyData: state.dataCorona.dataDaily,
  };
};

export default connect(mapStateToProps, { fetchDailyData })(Charts);
