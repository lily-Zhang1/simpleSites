var myChart1 = echarts.init(document.getElementById("result1"));

myChart1.setOption({
    title: {
        text: 'Mortality'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: 'mortality'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [{
            name: 'mortality',
            type: 'bar',
            showBackground: true,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: []
        }]
});
myChart1.showLoading();
$.get('data.json').done(function(data){
    myChart1.hideLoading();
    myChart1.setOption({
        xAxis: {
            data: data.date
        },
        series: [
            {
                name: 'mortality',
                data: data.mortality
            }
        ]
    });
});