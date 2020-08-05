var myChart = echarts.init(document.getElementById("result"));

myChart.setOption({
    title: {
        text: 'Result'
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
        data: ['mortality', 'recovery', 'confirmed']
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
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'mortality',
            type: 'line',
            stack: 'all',
            areaStyle: {},
            data: []
        },
        {
            name: 'recovery',
            type: 'line',
            stack: 'all',
            areaStyle: {},
            data: []
        },
        {
            name: 'confirmed',
            type: 'line',
            stack: 'all',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: []
        }
    ]
});
myChart.showLoading();
$.get('data.json').done(function(data){
    myChart.hideLoading();
    myChart.setOption({
        xAxis: {
            data: data.date
        },
        series: [
            {
                name: 'mortality',
                data: data.mortality
            },
            {
                name: 'recovery',
                data: data.recovery
            },
            {
                name: 'confirmed',
                data: data.confirmed
            }
        ]
    });
});