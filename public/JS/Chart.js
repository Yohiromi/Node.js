// charts-setup.js
var AddList = []
var EditList = []
var DeleteList = []
var DateList = []


var AddData = []
var EditData = []
var DeleteData = []

function Public() {
    for (const item of contributions) {
        console.log(item);
        if (item.action === 'AddCharacter') {
            AddList.push(item)
        } else if (item.action === 'EditCharacter') {
            EditList.push(item)
        } else if (item.action === 'DeleteCharacter') {
            DeleteList.push(item)
        }
        if (!DateList.includes(item.date.split('T')[0])) {
            DateList.push(item.date.split('T')[0])
        }
    }
    for (let i = 0; i < DateList.length; i++) {
        //初始化数据
        AddData.push(0)
        EditData.push(0)
        DeleteData.push(0)
    }

    for (let element of DateList) {
        for (let key1 of AddList) {
            if (key1.date.split('T')[0] === element) {
                AddData[DateList.indexOf(element)]++
            }
        }
        for (let key2 of EditList) {
            if (key2.date.split('T')[0] === element) {
                EditData[DateList.indexOf(element)]++
            }
        }
        for (let key3 of DeleteList) {
            if (key3.date.split('T')[0] === element) {
                DeleteData[DateList.indexOf(element)]++
            }
        }
    }
}

// 折线图配置
function LineChart() {
    const AddDataSet = {
        label: 'AddCharacter',
        data: AddData,
        fill: false,
        borderColor: 'rgb(75,192,77)',
        tension: 0.1
    }
    const EditDataSet = {
        label: 'EditCharacter',
        data: EditData,
        fill: false,
        borderColor: 'rgb(241,218,84)',
        tension: 0.1
    }
    const DeleteDataSet = {
        label: 'DeleteCharacter',
        data: DeleteData,
        fill: false,
        borderColor: 'rgb(222,11,29)',
        tension: 0.1
    }
    const allDataSet = [AddDataSet, EditDataSet, DeleteDataSet]


    var ctxLine = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: DateList,
            datasets: allDataSet,
        }
    });
}

// 柱状图配置
function BarChart() {

    const AddDataSet = {
        label: 'AddCharacter',
        data: AddData,
        backgroundColor: 'rgba(34,239,27,0.79)',
        borderColor: 'rgba(134,236,162,0.71)',
        borderWidth: 1
    }
    const EditDataSet = {
        label: 'EditCharacter',
        data: EditData,
        backgroundColor: 'rgba(255,222,11,0.83)',
        borderColor: 'rgba(232,210,102,0.72)',
        borderWidth: 1
    }
    const DeleteDataSet = {
        label: 'DeleteCharacter',
        data: DeleteData,
        backgroundColor: 'rgba(231,38,38,0.91)',
        borderColor: 'rgba(225,23,23,0.78)',
        borderWidth: 1
    }
    const allDataSet = [AddDataSet, EditDataSet, DeleteDataSet]

    var ctxBar = document.getElementById('barChart').getContext('2d');
    var barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: DateList,
            datasets: allDataSet,
        }
    });
}

// 饼图配置
function PieChart() {
    var ctxPie = document.getElementById('pieChart').getContext('2d');
    var pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['AddCharacter', 'EditCharacter', 'DeleteCharacter'],
            datasets: [{
                label: 'Number',
                data: [AddList.length, EditList.length, DeleteList.length],
                backgroundColor: [
                    'rgba(174,255,99,0.5)',
                    'rgba(232,210,102,0.5)',
                    'rgba(225,23,23,0.5)'
                ],
                borderColor: [
                    'rgb(86,201,41)',
                    'rgb(255,202,43)',
                    'rgb(231,13,39)'
                ],
                borderWidth: 1
            }]
        }
    });
}

// 初始化所有图表
function initCharts() {
    Public();
    LineChart();
    BarChart();
    PieChart();
}

document.addEventListener('DOMContentLoaded', initCharts);
