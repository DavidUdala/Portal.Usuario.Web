export class PagedResult<T>{
    pageNumber : number;
    pageSize : number;
    totalRecords : number;
    data? : T

    constructor(pageNumber: number, pageSize: number, totalRecords : number, data : T ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalRecords = totalRecords;
        this.data = data;
    }
}