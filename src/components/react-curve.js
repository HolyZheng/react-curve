const React = require('react');
require('core-js/features/array/map');
const {DataToCoordinate, PathBezier} = require('../common/util');

class ReactCurve extends React.Component {
    render() {
        let processedData
        if (this.props.offset) {
            // border等误差，传入800px
            processedData = DataToCoordinate(this.props.data, this.props.width, this.props.contentHeight, this.props.offset);
        } else {
            processedData = DataToCoordinate(this.props.data, this.props.width, this.props.contentHeight);
        }
        let path = PathBezier(processedData);
        let textList;
        if (this.props.textPosition === 'top') {
            textList = processedData.map((item, index) => 
                <text className="polyline-text" fill="#555" x={item[0] - 10} y={item[1] - 10} key={index}>{this.props.data[index] + "°"}</text>
            );
        } else {
            textList = processedData.map((item, index) => 
                <text className="polyline-text" fill="#555" x={item[0] - 10} y={item[1] + 20} key={index}>{this.props.data[index] + "°"}</text>
            );
        }

        return (
            <svg width={this.props.width} height={this.props.height}>
                <path className="polyline-path" d={path} stroke={this.props.lineColor} strokeWidth="2" fill="none" strokeLinecap="round" />
                {textList}
            </svg>
        )
    }
}

module.exports = ReactCurve;