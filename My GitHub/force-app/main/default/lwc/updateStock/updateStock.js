import { LightningElement, track } from 'lwc';
import getData from '@salesforce/apex/UpdateStockCtrl.getData';
export default class UpdateStock extends LightningElement {
    showRecords = false;
    searchDisabled = true;
    updateDisabled = true;
    @track allData = [];
    countOptions = [{'label':'5', 'value':'5'},
                    {'label':'10', 'value':'10'},
                    {'label':'20', 'value':'20'},
                    {'label':'50', 'value':'50'},
                    {'label':'100', 'value':'100'}];
    @track selectedCount = '5';
    @track recordsPerPageMap = new Map();
    @track currentPageRecords = [];
    currentPage = 1;
    totalPages = 1;
    allRecordsMap = {};
    connectedCallback() {
        getData()
        .then(result=>{
            if(result){
                this.allData = result;
                this.allData.map(rec=>{
                this.allRecordsMap[rec.Id] = rec;
                });
                this.maintainData( JSON.stringify(this.allData), this.selectedCount);
                this.showRecords = true;
            }
        })
        .catch(error=>{

        })
    }
    handleCountChange(event){
        var currValue = this.countOptions.find(item => item.value == event.detail.value);
        this.selectedCount = currValue.label;
        this.maintainData( JSON.stringify(this.allData), this.selectedCount);
    }

    maintainData(data, count){
        let allRecords = JSON.parse(data);
        if(allRecords.length > count){
            let i = 1;
            let recSet = [];
            allRecords.forEach(rec => {
               if(recSet.length < count){
                   recSet.push(rec);
               }
               if(recSet.length == count || (((i-1)*count)+recSet.length == allRecords.length)){
                  this.recordsPerPageMap.set(i, recSet);
                  recSet = [];
                  i++;
               }
            });
            this.totalPages = i -1;
            this.currentPageRecords = this.recordsPerPageMap.get(this.currentPage);
        }
        else
            this.currentPageRecords = this.allData;
    }
}