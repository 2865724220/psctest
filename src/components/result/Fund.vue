<template>
    <div class="fund-wrap">
      <div :class="{'fund-name':show===false,'hid':show===true}" @click="fundCon()">
        所属行业相关基金: {{fundName}}
      </div>

      <div>
        <div :class="{'fund-con':show===false,'hid':show===true}" @click="fundCon()">
          <!-- <a :href ="`https://test-paladin.pingan.com.cn:10094/jf/#/valuation/${fundId}/${fundName}`"> -->
            <div class="clearfix">
              <div class="fund-l fl">
                <span  v-if="f208Loading" class="tips"> 加载中...</span>
                <span  v-if="f208Null" class="tips"> 暂无数据</span>
                <div class="chart-real" id="chart01" height="">
                </div>
                <div class="fund-text">
                  <span class="bold">{{newP}}</span>
                  <span :class="{'red':parseFloat(rtChg)>0,'green':parseFloat(rtChg)<0,'default':parseFloat(rtChg)=== 0}">{{(rtChg*100).toFixed(2)}}%</span>
                </div>
                <div class="fund-real">实时估值</div>
              </div>
              <div class="fund-r fr">
                <span class="fund-name">{{fundName}}</span>
                <div class="fund-code">
                  <span>{{fundId}}</span>
                  <!-- <em></em>
                  <span>股票型</span> -->
                </div>
                <div class="fund-pro">
                  <em :class="{'red':parseFloat(pchgY1)>0,'green':parseFloat(pchgY1)<0,'default':parseFloat(pchgY1)=== 0}">{{(pchgY1*100).toFixed(2)}}%</em>
                  <span>近一年涨幅</span>
                </div>
              </div>
            </div>
            <!-- <p class="fund-re">推荐理由：该基金重仓雷柏科技，市值占比10%</p> -->
          <!-- </a> -->
        </div>

        <div :class="{'ifra':show===true,'hid':show===false}" @click="fundCon()">
          返回基金列表
        </div>
        <div :class="{'ifra':show===true,'hid':show===false}" @click="fundCon()">
          <iframe :src="`https://test-paladin.pingan.com.cn:10094/jf/#/valuation/${fundId}/${fundName}`" class='ifra2'/>
        </div>
      </div>

    </div>
</template>
<script>
// import echarts from 'echarts'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import axios from 'axios'

let year = new Date().getFullYear()
let month = (new Date().getMonth() + 1) > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)
let day = new Date().getDate() > 9 ? new Date().getDate():'0' + new Date().getDate()
let YMD = '' + year + '' + month + '' + day

let lDate = new Date()
lDate.setTime(lDate.getTime() - 24 * 60 * 60 * 1000)
let lYear = lDate.getFullYear()
let lMonth = (lDate.getMonth() + 1) > 9 ? lDate.getMonth() + 1 : '0' + (lDate.getMonth() + 1)
let lDay = lDate.getDate() > 9 ? lDate.getDate() : '0' + (lDate.getDate())
let LYMD = '' + lYear + '' + lMonth + '' + lDay
let hours = lDate.getHours()
let minutes = lDate.getMinutes()
if (hours < 9 || (hours === 9 && minutes < 30)) {
  YMD = LYMD
}

export default {
  name: 'Industry',
  data () {
    return {
      show:false,
      line: [],
      // fundId: localStorage.getItem('fund_code')
      fundId: '查询中...',
      fundName:'查询中...',
      dataX: ['0930',"0931", "0932", "0933", "0934", "0935", "0936", "0937", "0938", "0939", "0940", "0941", "0942", "0943", "0944", "0945", "0946", "0947", "0948", "0949", "0950", "0951", "0952", "0953", "0954", "0955", "0956", "0957", "0958", "0959", "1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1100", "1101", "1102", "1103", "1104", "1105", "1106", "1107", "1108", "1109","1110", "1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121", "1122", "1123", "1124", "1125", "1126", "1127", "1128", "1129", "1130", "1300", "1301", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1311", "1312", "1313", "1314", "1315", "1316", "1317", "1318", "1319", "1320","1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1337", "1338", "1339", "1340", "1341", "1342", "1343", "1344", "1345", "1346", "1347", "1348", "1349", "1350", "1351", "1352", "1353", "1354", "1355", "1356", "1357", "1358", "1359", "1400", "1401", "1402", "1403", "1404", "1405", "1406", "1407", "1408", "1409", "1410", "1411", "1412", "1413", "1414", "1415", "1416", "1417", "1418", "1419", "1420", "1421", "1422", "1423", "1424", "1425", "1426", "1427", "1428", "1429", "1430", "1431", "1432", "1433", "1434", "1435", "1436", "1437", "1438", "1439", "1440", "1441", "1442", "1443", "1444", "1445", "1446", "1447", "1448", "1449", "1450", "1451", "1452", "1453", "1454", "1455", "1456", "1457", "1458", "1459", "1500"],
      priceL: [],
      startValuation: '',
      preValuation: '',
      dataXX: [],
      fundE: [],
      newP: '',
      rtChg: '',
      pchgY1: '',
      f208Loading:true,
      f208Null:false,
      height:'0px',
      // f208Success:false
    }
  },
  mounted () {
    let timer
    // this.chartLine01()
    this.fetchfund()
    timer = setInterval(() => {
      this.fetchfund()
    }, 60000)

  },
  methods: {
    fetchfund () {
      // let fundId = localStorage.getItem('fund_code')
      let _this = this
      _this.fundId = localStorage.getItem('fund_code').split('.')[0]
      _this.fundName = localStorage.getItem('fund_name')
      axios.post('https://test-paladin.pingan.com.cn:10094/app/F208', {
        dateType: 'T',
        decimalDigits: '4',
        endTime: '',
        fundId: _this.fundId,
        lang: null,
        orgId: '310002',
        reqChl: '03',
        reqTime: '20180725155411123',
        serNum: '1234567890',
        sign: 'SHA256withRSA2048',
        startTime: '093000',
        token: 'D688D2555ED94C7285D26BDF4B13D08F',
        tranCode: 'F208',
        valuationDate: YMD,
        version: '100'
      }).then(res => {
        if ( res.data.respCode === '00' ) {
          console.log(res)

          let dataXX = []
          let pLimit =[];
          let vae =[];
          for(var i =0;i<_this.dataX.length;i++){
            dataXX.push(parseFloat(res.data.startValuation))
          }
          _this.startValuation = res.data.startValuation
          _this.preValuation = res.data.preValuation


          res.data.fundEvalList.map((value,key)=>{
            vae.push((value.valuation*1).toFixed(4));
            pLimit.push((value.valuation*1- res.data.startValuation*1)/res.data.startValuation*100).toFixed(2);
          })


          _this.newP = res.data.fundEvalList[res.data.fundEvalList.length-1].valuation
          _this.rtChg = res.data.rtChg
          _this.pchgY1 = res.data.pchgY1
          _this.dataXX = dataXX
          _this.priceL = pLimit
          _this.fundE = vae
          _this.f208Loading = false
          // _this.f208Success = true
          _this.height = '60px'
          _this.chartLine01()
        } else {
          _this.f208Loading = false
          _this.f208Null = true

          // alert(res.data.respMsg)
        }

      }).catch(function(error){
        _this.f208Loading = false
        _this.f208Null = true
        console.log(error)
      })
    },
    chartLine01 () {
      let chartLine = echarts.init(document.getElementById('chart01'))

      let ras = Math.min.apply(null,this.priceL).toFixed(2)
      let rab = Math.max.apply(null,this.priceL).toFixed(2)
      let raa
      if(Math.abs(ras)>= Math.abs(rab)){
        raa = Math.abs(ras)
      }else{
        raa = Math.abs(rab)
      }

      console.log(raa)
      raa = raa + raa*0.15
      let rad = (raa*0.01).toFixed(4)
      let min = Math.min.apply(null,this.fundE)
      let max = Math.max.apply(null,this.fundE)
      // console.log(rad)
      let realStartVa = (this.startValuation === null|| parseFloat(this.startValuation) === 0)?this.preValuation:this.startValuation

      console.log(realStartVa)

      let minV = (realStartVa*1 - realStartVa*rad).toFixed(4)
      let maxV = (realStartVa*1 + realStartVa*rad).toFixed(4)
      let _this = this
      var option = {
        title: '',
        tooltip: {},
        grid: {
          top: '2%',
          left: '0%',
          right: '0%',
          bottom: '12%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#F6F8FB'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#6B7D97',
              fontSize: '10'
            }
            // interval: 0,
            // rotate: -90
          },
          data:_this.dataX
        },
        yAxis: [
          {
            type : 'value',
            position:'left',
            min:minV,
            max:maxV,
            // splitNumber:10,
            interval:realStartVa*rad*0.5,
            axisLine:{
              show:false,
              lineStyle:{
                color:'#fff'
              }
            },
            axisLabel:{
              show:true,
              textStyle:{
                color:'#6B7D97',
                fontSize:'10'
              },
              formatter:function (value,index) {
                return value.toFixed(4)
              }
            },
            splitLine:{
              show:false,
              lineStyle:{
                color:'#fff',
                width:1
              }
            },
            splitArea:{
              show:false,
              areaStyle:{
                color:'#F6F8FB'
              }
            }
          },
          {
            type : 'value',
            position:'right',
            min:-raa,
            max:raa,
            yAxisIndex:0,
            splitNumber:8,
            axisLine:{
              lineStyle:{
                color:'#fff'
              }
            },
            axisLabel:{
              show:false,
              textStyle:{
                color:'#6B7D97',
                fontSize:'10'
              },
              formatter:function (value,index) {
                return value.toFixed(2)+'%'
              }
            },
            splitLine:{
              show:false,
              lineStyle:{
                color:'#fff',
                width:1
              }
            },
            splitArea:{
              show:true,
              areaStyle:{
                color:'#F6F8FB'
              }
            }
          },
        ],
        series: [
          {
            name:'实时股价',
            type:'line',
            symbol:'none',
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            lineStyle: {
              normal: {
                color: '#079EF6',
                width: 1,
                type: 'solid',
                opacity: 1,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgba(7,158,246,0)',
              },

            },
            data:_this.fundE
          },
          {
            name:'股价基线',
            type:'line',
            smooth:true,
            symbol:'none',
            sampling:'average',
            itemStyle: {
              normal: {
                lineStyle:{
                  color:'#EB6897',
                  width:1
                },
                color: 'rgb(255, 255, 255)'
              }
            },

            data:_this.dataXX
          },
        ]
      }
      chartLine.setOption(option)
      // chartLine02.setOption(option)
    },
    fundCon() {
      this.show = !this.show
    }
  }

}
</script>
<style scoped>
.ifra{
  font-size: 16px;
  color: #1b1b9c;
  padding-bottom:10px;
  /* background-color: #29c69a */
}
.ifra2{
  height:600px;
  width: 100%;
  min-width: 350px;
}
.fund-name{
  font-size: 16px;
}
.fund-wrap{
  background: #fff;
  padding:10px 16px;
}
.fund-con{
  background: #F6F8FB;
  padding: 20px;
  margin: 10px 0px 10px 0px;
}
.fund-text span{
  display: inline-block;
  vertical-align: middle;
}
.fund-text .bold{
  font-size:14px;
}
.fund-text .red{
  color:#ff4f29;
}
.fund-text .green{
  color:#29c69a;
}
.fund-real{
  text-align: center;
  padding: 4px 0 0;
}
.fund-l{
  width:44%;
  border-right:1px solid #486491;
  padding:0 10px 0 0;
}
.fund-r{
  width:56%;
  padding:0 20px;
}
.fund-re{
  padding:10px 0 0;
}
.fund-text{
  text-align: center;
}
.fund-name{
  display: block;
  font-size:16px;
  padding:0 0 6px;
}
.fund-pro{
  padding:4px 0;
}
.fund-pro .red{
  color:#ff4f29;
}
.fund-pro .green{
  color:#29c69a;
}
.chart-real{
  display: block;
  width:100%;
  height:60px;
}
span.tips {
  display: block;
  text-align: center;
  font-size: 14px;
  padding: 20px 0 12px;
}
.hid{
  display: none;
}
</style>
