import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Icon , Tooltip } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

var _ = require('lodash');


const chartMonthly = ({ treedata , monthly }) => {

  const { loading , data : list } = monthly;


  const init = () => {
    if(!loading){
      // echarts_instance.clear();
      let legendInfo = [];
      let companyInfo = [];
      let tokenInfo = [];
      let series = [];
      let seriesActive = [];
      let seriesInstall = [];

      _.forEach(_.chain(list).orderBy(['companyid','year', 'month'],['asc', 'asc', 'asc']).value() , (item) => {
        companyInfo.push(item.companyid);
        tokenInfo.push(`${item.year}-${item.month}`);
      });

      companyInfo = _.uniq(companyInfo);
      tokenInfo = _.uniq(tokenInfo);
      seriesActive = _.map(companyInfo, (companyId) => {
        var result = [];
        _.chain(list).
          filter((item) => { return item.companyid === companyId }).
          forEach(item => {
            _.forEach(tokenInfo , (token , index ) => {
              var itemToken = `${item.year}-${item.month}`;
              if(itemToken === token){
                result[index] = item.activity_sum
              }
            })
          }).value()
        const [ node , ] = treedata.filter((item) => item.id === companyId);
        const nodeName = node.note;
        legendInfo.push(`${nodeName}报活量`);
        return {
          name: `${nodeName}报活量`,
          type: 'line',
          data : result
        }
      })


      seriesInstall = _.map(companyInfo , (companyId) => {
        var result = [];
        _.chain(list).
          filter((item) => { return item.companyid === companyId }).
          forEach(item => {
            _.forEach(tokenInfo , (token , index ) => {
              var itemToken = `${item.year}-${item.month}`;
              if(itemToken === token){
                result[index] = item.install_sum
              }
            })
          }).value()
        const [ node , ] = treedata.filter((item) => item.id === companyId);
        const nodeName = node.note;
        legendInfo.push(`${nodeName}安装量`);
        return {
          name: `${nodeName}安装量`,
          type: 'bar',
          stack: 'install',
          data : result
        }
      });
      console.log(seriesInstall);
      series = _.concat(seriesActive,seriesInstall );
      return {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c}'
          },
          legend:{
             top:'70%',
             itemWidth:14,
             data:legendInfo
         },
          xAxis: {
              axisLabel : {
                interval : 0
              },
              name: '报活日期',
              data: tokenInfo
          },
          grid: {
              height:'50%',
              containLabel: true
          },
          yAxis: {
              name: '报活数'
          },
          series: series
      }
    }
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
            left: 'left',
            data: ['暂无']
        },
        xAxis: {
            splitLine: {
                interval:0
            },
            name: '报活日期',
            data: []
        },
        grid: {
            height:'50%',
            containLabel: true
        },
        yAxis: {
            name: '报活数'
        },
        series: [{
            name: '暂无',
            type: 'bar',
            data : []
        }]
    }

  }

  return (
    <div>
        <ReactEcharts
          showLoading={loading}
          option={init()}
          notMerge
          style={{
            height: 600,
          }}
        />
    </div>
  );
};

chartMonthly.propTypes = {
};

export default chartMonthly;
