import React, { Component, PropTypes } from 'react';
import ReactEcharts from 'echarts-for-react';

const ChartVersion = ({ version , type }) => {
  const { loading , list  } = version;
  const result = _.chain(list).groupBy('version').map((keyItem) => {
  if (keyItem.length > 0) {
    return {
      server_id: keyItem[0].server_id,
      version: keyItem[0].version,
      year: keyItem[0].year,
      month: keyItem[0].month,
      value: _.sumBy(keyItem, (item) => {
        if (type === 'install'){
          return item.install_sum
        } else {
          return item.activity_sum
        }
      })
    }
  }
}).
orderBy('value','desc').
slice(0,8).
filter((item) => { return item.value > 0 }).
value();

  const data = _.map(result, (item) => { return { name : item.version , value : item.value }});

  const option = {
    legend: {
      orient: 'vertical',
      x: 'right',
      data: _.map(result, (item) => { return item.version }),
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    grid: {
        top:'8%',
        containLabel: true
    },
    series: [
      {
        name: '版本分布',
        type: 'pie',
        radius: ['30%', '70%'],
        data,
      },
    ],
  };

  return (<ReactEcharts
    option={option} showLoading={loading}
  />);
};

ChartVersion.propTypes = {

};

export default ChartVersion;
