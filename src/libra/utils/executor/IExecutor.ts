module libra.utils.executor {
	/**
	 *
	 * @author 
	 *
	 */
    export interface IExecutor {

        regist(func: Function, thisObj: any): void;

        execute(): void;
    }
}
