/*!
 *  # Kid 1.0.0
 *  https://github.com/pangfeng/kid-fermat
 *  
 *  Copyright 2016 Contributors
 *  Released under the MIT license
 *  http://opensource.org/licenses/MIT
 *  
 *  @params points Array<{x,y}>
 *  @return {x,y}
 *
 */

 ;(function(){

    window.kid = window.kid || {};

    kid.getFermatPoint = function(points){
        var p = average(); //初始计算点
        var step = summation(p)/points.length;//p点到各点的平均距离作为初始步长值
        var threshold = step/10000; //计算结果的精度
        var sumdis = summation(p);
        var rate = 0.99;
        var index = 0;

        var i=0;

        while(step>threshold){
            i++;
            var x = p.x, y=p.y;

            var targetPoints = [
                {x: x+step, y: y+step},
                {x: x+step, y: y-step},
                {x: x-step, y: y+step},
                {x: x-step, y: y-step}
            ];

            for(var i=0,tp; tp=targetPoints[i++];){
                var tpSummation = summation(tp);
                if(tpSummation<sumdis){
                    p = tp;
                    sumdis = tpSummation;
                }
            }
            step *= rate;
            index ++ ;
        }

        function average(){
            var x=0, y=0, size = points.length;

            for(var i=0, point; point=points[i++];){
                x += point.x;
                y += point.y;
            }
            return {x: x/size, y: y/size};
        }

        function summation(p){
            var sum = 0.0;

            for(var i=0, point; point=points[i++];){
                sum += distance(p, point);
            }
            return sum;
        }

        function distance(p1, p2){
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        }

        return p;
    }
 }());
