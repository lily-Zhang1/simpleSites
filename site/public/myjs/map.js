var myChart0 = echarts.init(document.getElementById('map'));
option = {
    backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: '#E6E6E7'
    }, {
        offset: 1,
        color: '#E6E6E7'
    }]),
    title: {
        sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
        left: 'center',
        top: 'top',
        text: 'The latest situation of Covid-19 in the world'
    },

    visualMap: {
        min: 0,
        max: 500000,
        text:['High','Low'],
        realtime: false,
        calculable: true,
        color: ['orangered','yellow','lightskyblue']
    },

    series: [
        {
            name: 'The latest situation of Covid-19 in the world',
            type: 'map',
            mapType: 'world',
            roam: true,
            itemStyle:{
                emphasis:{label:{show:true}}
            },
            data:[
                {name: 'United States', value: 1793530},
                {name: 'Brazil', value: 465166},
                {name: 'United Kingdom', value: 272615},
                {name: 'Spain', value: 238564},
                {name: 'Italy', value: 232248},
                {name: 'Germany', value: 183025},
                {name: 'India', value: 174020},
                {name: 'Turkey', value: 162120},
                {name: 'France', value: 186924},
                {name: 'Iran', value: 146668},
                {name: 'Peru', value: 141779},
                {name: 'Canada', value: 90909},
                {name: 'Chile', value: 90638},
                {name: 'Mexico', value: 84627},
                {name: 'China', value: 84123},
                {name: 'Saudi Arabia', value: 81766},
                {name: 'Belgium', value: 58186},
                {name: 'Qatar', value: 52907},
                {name: 'Netherlands', value: 46132},
                {name: 'Bangladesh', value: 44608},
                {name: 'Belarus', value: 40764},
                {name: 'Ecuador', value: 38571},
                {name: 'Sweden', value: 36476},
                {name: 'United Arab Emirates', value: 33170},
                {name: 'Portugal', value: 31946},
                {name: 'Switzerland', value: 30828},
                {name: 'South Africa', value: 29240},
                {name: 'Colombia', value: 26734},
                {name: 'Indonesia', value: 25773},
                {name: 'Kuwait', value: 25184},
                {name: 'Ireland', value: 24876},
                {name: 'Poland', value: 23376},
                {name: 'Ukraine', value: 23204},
                {name: 'Egypt', value: 22082},
                {name: 'Romania', value: 18982},
                {name: 'Israel', value: 17008},
                {name: 'Japan', value: 16688},
                {name: 'Austria', value: 16685},
                {name: 'Philippines', value: 16634},
                {name: 'Dominican Republic', value: 16531},
                {name: 'Argentina', value: 15419},
                {name: 'Afghanistan', value: 14525},
                {name: 'Panama', value: 12531},
                {name: 'Denmark', value: 11593},
                {name: 'South Korea', value: 11441},
                {name: 'Republic of Serbia', value: 11354},
                {name: 'North Korea', value: 1.468},
                {name: 'Kazakhstan', value: 10382},
                {name: 'Oman', value: 9820},
                {name: 'Nigeria', value: 9302},
                {name: 'Czech Republic', value: 9200},
                {name: 'Algeria', value: 9134},
                {name: 'Bolivia', value: 8731},
                {name: 'Norway', value: 8425},
                {name: 'Moldova', value: 7896},
                {name: 'Malaysia', value: 7762},
                {name: 'Morocco', value: 7714},
                {name: 'Ghana', value: 7616},
                {name: 'Australia', value: 7185},
                {name: 'Finland', value: 6826},
                {name: 'Iraq', value: 5873},
                {name: 'Cameroon', value: 5436},
                {name: 'Azerbaijan', value: 4989},
                {name: 'Honduras', value: 4886},
                {name: 'Guatemala', value: 4607},
                {name: 'Sudan', value: 4521},
                {name: 'Luxembourg', value: 4012},
                {name: 'Hungary', value: 3867},
                {name: 'Tajikistan', value: 3686},
                {name: 'Uzbekistan', value: 3513},
                {name: 'Senegal', value: 3429},
                {name: 'Thailand', value: 3077},
                {name: 'Democratic Republic of the Congo', value: 2966},
                {name: 'Djibouti', value: 2914},
                {name: 'Greece', value: 2909},
                {name: 'Ivory Coast', value: 2750},
                {name: 'Gabon', value: 2613},
                {name: 'Bulgaria', value: 2499},
                {name: 'Bosnia and Herzegovina', value: 2485},
                {name: 'El Salvador', value: 2395},
                {name: 'Croatia', value: 2245},
                {name: 'Macedonia', value: 2129},
                {name: 'Cuba', value: 2005},
                {name: 'Estonia', value: 1865},
                {name: 'Somalia', value: 1828},
                {name: 'Iceland', value: 1805},
                {name: 'Kenya', value: 1745},
                {name: 'Kyrgyzstan', value: 1722},
                {name: 'Lithuania', value: 1670},
                {name: 'Haiti', value: 1584},
                {name: 'Sri Lanka', value: 1558},
                {name: 'Slovakia', value: 1521},
                {name: 'New Zealand', value: 1504},
                {name: 'Slovenia', value: 1473},
                {name: 'Venezuela', value: 1370},
                {name: 'Guinea Bissau', value: 1256},
                {name: 'Mali', value: 1226},
                {name: 'Nepal', value: 1212},
                {name: 'Lebanon', value: 1172},
                {name: 'Albania', value: 1099},
                {name: 'Tunisia', value: 1071},
                {name: 'Latvia', value: 1065},
                {name: 'Zambia', value: 1057},
                {name: 'Kosovo', value: 1048},
                {name: 'Costa Rica', value: 1022},
                {name: 'South Sudan', value: 994},
                {name: 'Ethiopia', value: 968},
                {name: 'Niger', value: 955},
                {name: 'Northern Cyprus', value: 942},
                {name: 'Cyprus', value: 942},
                {name: 'Paraguay', value: 917},
                {name: 'Central African Republic', value: 874},
                {name: 'Burkina Faso', value: 847},
                {name: 'Sierra Leone', value: 829},
                {name: 'Uruguay', value: 816},
                {name: 'Nicaragua', value: 759},
                {name: 'Chad', value: 759},
                {name: 'Georgia', value: 757},
                {name: 'Jordan', value: 730},
                {name: 'Madagascar', value: 698},
                {name: 'Jamaica', value: 575},
                {name: 'Republic of the Congo', value: 571},
                {name: 'United Republic of Tanzania', value: 509},
                {name: 'French Guiana', value: 450},
                {name: 'Togo', value: 428},
                {name: 'Mauritania', value: 423},
                {name: 'Rwanda', value: 355},
                {name: 'Uganda', value: 329},
                {name: 'Vietnam', value: 328},
                {name: 'Montenegro', value: 324},
                {name: 'Yemen', value: 283},
                {name: 'Swaziland', value: 279},
                {name: 'Malawi', value: 273},
                {name: 'Liberia', value: 273},
                {name: 'Mozambique', value: 234},
                {name: 'Benin', value: 224},
                {name: 'Myanmar', value: 224},
                {name: 'Mongolia', value: 179},
                {name: 'Guyana', value: 150},
                {name: 'Zimbabwe', value: 149},
                {name: 'Brunei', value: 141},
                {name: 'Bermuda', value: 140},
                {name: 'Cambodia', value: 125},
                {name: 'Syria', value: 122},
                {name: 'Libya', value: 118},
                {name: 'Trinidad and Tobago', value: 116},
                {name: 'The Bahamas', value: 102},
                {name: 'Angola', value: 81},
                {name: 'Burundi', value: 42},
                {name: 'Eritrea', value: 39},
                {name: 'Botswana', value: 35},
                {name: 'Bhutan', value: 33},
                {name: 'Gambia', value: 25},
                {name: 'East Timor', value: 24},
                {name: 'Namibia', value: 23},
                {name: 'Laos', value: 19},
                {name: 'New Caledonia', value: 19},
                {name: 'Fiji', value: 18},
                {name: 'Belize', value: 18},
                {name: 'Falkland Islands', value: 13},
                {name: 'Greenland', value: 13},
                {name: 'Suriname', value: 12},
                {name: 'Western Sahara', value: 9},
                {name: 'Papua New Guinea', value: 8},
                {name: 'Lesotho', value: 2},
                {name: 'Puerto Rico', value: 0},
                {name: 'French Southern and Antarctic Lands', value: 0},
                {name: 'Guinea', value: 0},
                {name: 'Pakistan', value: 0},
                {name: 'Russia', value: 0},
                {name: 'Solomon Islands', value: 0},
                {name: 'Somaliland', value: 0},
                {name: 'Turkmenistan', value: 0},
                {name: 'Vanuatu', value: 0},
                {name: 'West Bank', value: 0},
            ]
        }
    ]
};

myChart0.setOption(option);