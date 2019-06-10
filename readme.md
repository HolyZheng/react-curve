## react-curve
从天气预报项目中抽取出来的基于svg的圆滑折线图组件。

## usage
```
npm install --save react-curve
```
```js
// 引入
import ReactCurve from 'react-curve'
// demo
ReactCurve lineColor="#F99952" textPosition="bottom" data={[10,13,15,20,10,12]} offset={30} width={800} height={100} contentHeight={50}/>,
```
| 参数 | 值类型 | 意义 |
| :------: | :------: | :------: |
| lineColor | string | 曲线线条颜色 |
| textPosition | string | 数字位于线条上方/下方 |
| data | array<number> | 要展示的数据 |
| offset | number | 线条向下偏移量（默认是10） |
| width | number | 组件宽度 |
| height | number | 组件高度 |
| contentHeight | number | 内容高度即线条最高峰和最低分的高低差 |