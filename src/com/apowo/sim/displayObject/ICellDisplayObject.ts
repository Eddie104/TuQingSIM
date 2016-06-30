module sim.displayObject {

    /**
     * 根据格子索引放置的可是对象
     */
    export interface ICellDisplayObject {

        setRowAndCol(row: number, col: number): void;

        getRow(): number;
        
        getCol(): number;

    }
}
