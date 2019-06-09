// 获取贝塞尔曲线控制点
export const Bezier = {
    getControlPointA(currPoint, prePoint, nextPoint) {
        let x;
        let y;
        // 公式
        x = currPoint[0] + (nextPoint[0] - prePoint[0])/4;
        y = currPoint[1] + (nextPoint[1] - prePoint[1])/4;
        return [x, y]
    },
    // 第一段，把第一点作为自己的上一个点
    getControlPointAFirst(currPoint, nextPoint) {
        let x;
        let y;
        // 公式
        x = currPoint[0] + (nextPoint[0] - currPoint[0])/4;
        y = currPoint[1] + (nextPoint[1] - currPoint[1])/4;
        return [x, y]
    },
    getControlPointB(currPoint, prePoint, nextPoint) {
        let x;
        let y;
        // 公式
        x = currPoint[0] - (nextPoint[0] - prePoint[0])/4;
        y = currPoint[1] - (nextPoint[1] - prePoint[1])/4;
        return [x, y]
    },
    //最后一段，把最后一点当作自己的下一点。
    getControlPointBLast(currPoint, prePoint) {
        let x;
        let y;
        // 公式
        x = currPoint[0] - (currPoint[0] - prePoint[0])/4;
        y = currPoint[1] - (currPoint[1] - prePoint[1])/4;
        return [x, y]
    }
}
// 将svg坐标转化为path的d属性。
export const PathBezier = (data) => {
  let len = data.length;
  let path
  if (len) {
      path = `M${data[0][0]} ${data[0][1]}`;
  } else {
      return "";
  }
  let pointA;
  let pointB;
  for (let i = 0; i < len-1; i++) {
      if (i === 0) {
          pointA = Bezier.getControlPointAFirst(data[0], data[1]);
          pointB = Bezier.getControlPointB(data[1], data[0], data[2]);
      } else if (i === len-2) {
          pointA = Bezier.getControlPointA(data[i], data[i-1], data[i+1]);
          pointB = Bezier.getControlPointBLast(data[i+1], data[i]);
      } else {
          pointA = Bezier.getControlPointA(data[i], data[i-1], data[i+1]);
          pointB = Bezier.getControlPointB(data[i+1], data[i], data[i+2]);
      }
      path += ` C ${pointA[0]} ${pointA[1]} ${pointB[0]} ${pointB[1]} ${data[i+1][0]} ${data[i+1][1]}`;
  }
  return path
}

// 将温度数组转化为svg坐标。 offset 向下偏移量默认是6，避免线条被svg上边界遮盖
export const DataToCoordinate = (data, width, height, offset = 10) => {
  let max = Math.max(...data);
  let min = Math.min(...data);
  let interval = width/data.length;
  let weight;
  if (max > min) {
      weight = height/(max-(min));
  } else {
      weight = 1;
  }
  let res = [];
  for(let index = 0; index < data.length; index++) {
      if (index === 0) {
          // offset向下偏移量，来腾出空间显示数字
          res.push([interval/2, height + offset - weight*(data[index] - min)])
      } else {
          res.push([index*interval + interval/2, height + offset - weight*(data[index] - min)])
      }
  }
  return res
}

export const getQueryValue = (key) =>{
  let query = window.location.search.substring(1);
  let items = query.split("&");
  for (let i = 0; i < items.length; i++) {
      let pair = items[i].split("=");
      if (pair[0] === key) return pair[1]
  }
  return false;
}