import { LightningElement, api } from 'lwc';
import getServiceResource from '@salesforce/apex/ReviewScreenCmpCtrl.getServiceResource';
import getWorkTypeGroup from '@salesforce/apex/ReviewScreenCmpCtrl.getWorkTypeGroup';
import getFormatedDateTime from '@salesforce/apex/ReviewScreenCmpCtrl.getFormatedDateTime';
import {FlowNavigationBackEvent,FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class ReviewScreenCmp extends LightningElement {
@api
appointmenttype;
@api
parentId;
@api
additionalinformation;
@api
city;
@api
comment;
@api
country;
@api
schedendtime;
@api
postalcode;
@api
schedstarttime;
@api
state;
@api
street;
@api
worktypegroupid;
@api
serviceresourceid;
@api
serviceterritoryid;
@api
additionalfields;
@api
isanonymousbooking;
@api
leadfirstname;
@api
leadlastname;
@api
leademail;
@api
leadphone;
@api
selectedimezone;
@api
OptionalAttendees;
serviceresourcename;
worktypegroupname;
formattedstartdate;
formattedenddate;
appointmenttypename;
selectedlocation;
haserror = false;
leadcode;
leadphonenumber;
description;

get options() {
    return [
        { label: 'In Australia', value: 'In Australia' },
        { label: 'Outside Australia', value: 'Outside Australia' },
    ];
}

connectedCallback() {
    getServiceResource({serviceResourceId : this.serviceresourceid}).then(result =>{this.serviceresourcename = result;});
    getWorkTypeGroup({workTypeGroupId : this.worktypegroupid}).then(result =>{this.worktypegroupname = result;});
    getFormatedDateTime({dateTimeString : this.schedstarttime, timezone : this.selectedimezone}).then(result =>{this.formattedstartdate = result;});
    getFormatedDateTime({dateTimeString : this.schedendtime, timezone : this.selectedimezone}).then(result =>{this.formattedenddate = result;});
    this.appointmenttypename = this.appointmenttype == 'People' ? 'In-Person' : 'Video';
}

handleClickPrevious() {
    const navigatePreviousEvent = new FlowNavigationBackEvent();
    this.dispatchEvent(navigatePreviousEvent);
}

handleClickNext() {
    this.haserror = false;
    this.selectedlocation = this.template.querySelector('lightning-radio-group').value;
    this.leadfirstname = this.template.querySelector('lightning-input[data-name="FName"]').value;
    this.leadlastname = this.template.querySelector('lightning-input[data-name="LName"]').value;
    this.leademail = this.template.querySelector('lightning-input[data-name="Email"]').value;
    this.leadcode = this.template.querySelector('lightning-input[data-name="Code"]').value;
    this.leadphonenumber = this.template.querySelector('lightning-input[data-name="Phone"]').value;
    this.leadphone = this.leadcode+this.leadphonenumber;
    this.description = this.template.querySelector('textarea').value;
    
    this.additionalfields = '{"AdditionalInformation":"';
    if(this.additionalinformation == undefined)
        this.additionalfields += '"';
    else
        this.additionalfields += this.additionalinformation+'"';
    this.additionalfields += ',"AppointmentType":"'+this.appointmenttype+'","Comments":"';
    
    if(this.comment == undefined)
        this.additionalfields += '"';
    else
        this.additionalfields += this.comment+'"';
    
    this.additionalfields += ',"ServiceTerritoryId":"'+this.serviceterritoryid+'","ServiceResourceId":"'+this.serviceresourceid+'","WorkTypeGroupId":"'+this.worktypegroupid+'"';
    
    if(this.parentId != undefined)
        this.additionalfields += ',"ParentRecordId":"'+this.parentId+'"';
    
    this.additionalfields += ',"Street":"'+this.street+'","City":"'+this.city+'","State":"'+this.state+'","Country":"'+this.country+'","PostalCode":"'+this.postalcode+'","SchedStartTime":"'+this.schedstarttime+'","SchedEndTime":"'+this.schedendtime+'","Description":"';
    
    if(this.description == undefined)
        this.additionalfields += '"';
    else
        this.additionalfields += this.description+'"';

    this.additionalfields +=',"isSlotChanged":false,"Current_User_Location__c":"'+this.selectedlocation+'"}';

    this.validatedata();

    if(!this.haserror) {
        const navigateNextEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(navigateNextEvent);
    }
}
validatedata() {
     if(!this.template.querySelector('lightning-radio-group').checkValidity()){
        this.template.querySelector('lightning-radio-group').reportValidity();
        this.haserror = true;
     }
     if(!this.template.querySelector('lightning-input[data-name="FName"]').checkValidity()){
        this.template.querySelector('lightning-input[data-name="FName"]').reportValidity();
        this.haserror = true;
     }
     if(!this.template.querySelector('lightning-input[data-name="LName"]').checkValidity()){
        this.template.querySelector('lightning-input[data-name="LName"]').reportValidity();
        this.haserror = true;
     }
     if(!this.template.querySelector('lightning-input[data-name="Code"]').checkValidity()){
        this.template.querySelector('lightning-input[data-name="Code"]').reportValidity();
        this.haserror = true;
     }
     if(!this.template.querySelector('lightning-input[data-name="Email"]').checkValidity()){
        this.template.querySelector('lightning-input[data-name="Email"]').reportValidity();
        this.haserror = true;
     }
     if(!this.template.querySelector('lightning-input[data-name="Phone"]').checkValidity()){
        this.template.querySelector('lightning-input[data-name="Phone"]').reportValidity();
        this.haserror = true;
     }
}
}