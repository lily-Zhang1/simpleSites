var myChart2 = echarts.init(document.getElementById("result2"));

myChart2.setOption({
    title: {
        text: 'Recovery'
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
        data: 'recovery'
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
        itemStyle:{
            normal:{
                color:'#0D658C'
            }
        },
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
myChart2.showLoading();
$.get('data.json').done(function(data){
    myChart2.hideLoading();
    myChart2.setOption({
        xAxis: {
            data: data.date
        },
        series: [
            {
                name: 'recovery',
                data: data.recovery
            }
        ]
    });
});