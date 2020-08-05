var myChart3 = echarts.init(document.getElementById("result3"));

myChart3.setOption({
    title: {
        text: 'Confirmed'
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
        data: 'confirmed'
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
        name: 'confirmed',
        type: 'bar',
        showBackground: true,
        itemStyle:{
            normal:{
                color:'#F9C626'
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
myChart3.showLoading();
$.get('data.json').done(function(data){
    myChart3.hideLoading();
    myChart3.setOption({
        xAxis: {
            data: data.date
        },
        series: [
            {
                name: 'confirmed',
                data: data.confirmed
            }
        ]
    });
});