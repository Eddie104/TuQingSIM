module libra.utils.queryUtil {
	/**
	 *
	 * @author 
	 *
	 */
	
    export function queryByType(ary: Array<any>, val: number, property: string = 'type'):any {
        if(!ary) return null;
        var leftIndex: number = 0, middleIndex: number = 0;
        var rightIndex: number = ary.length - 1;
        while(rightIndex >= leftIndex) {
            middleIndex = (rightIndex + leftIndex) >> 1;
            if(ary[middleIndex][property] > val) {
                rightIndex = middleIndex - 1;
            } else {
                leftIndex = middleIndex + 1;
            }
        }
        return ary[leftIndex - 1];
    };
    
    export class T {

        public constructor(){
            
        }
        
        public static queryByType(ary: Array<any>, val: number, property: string = 'type'): any {
            if(!ary) return null;
            var leftIndex: number = 0, middleIndex: number = 0;
            var rightIndex: number = ary.length - 1;
            while(rightIndex >= leftIndex) {
                middleIndex = (rightIndex + leftIndex) >> 1;
                if(ary[middleIndex][property] > val) {
                    rightIndex = middleIndex - 1;
                } else {
                    leftIndex = middleIndex + 1;
                }
            }
            return ary[leftIndex - 1];
        }
    };
}
