<template>
    <div class="Myticket">
        <div class="Myticket-name">My Tickets</div>

        <div v-if="tickettype == 'OpenCase'">
            <div class="Myticket-OpenCasecheck">
                Open Case
            </div>
        </div>
        <div v-else>
            <div class="Myticket-OpenCase" @click="ToOpenCase">
                Open Case
            </div>
        </div>
        <div v-if="tickettype == 'ClosedCase'">
            <div class="Myticket-ClosedCasecheck">
                Closed Case
            </div>
        </div>
        <div v-else>
            <div class="Myticket-ClosedCase" @click="ToClosedCase">
                Closed Case
            </div>
        </div>

        <!-- <div class="Myticket-search">
            Search:
            <input class="Myticket-search-text" type="text" placeholder="Please enter" onfocus="this.placeholder=''" onblur="this.placeholder='Please enter'" v-model="search">
        </div> -->
                      
                    <div id="open" v-show="openbutton" class="Excelbuttonopen" @click="onBtExportopen()">
                        <img src="../../assets/img/ExportCsv.jpg">
                    </div>
                    <div id="close" v-show="closebutton" class="Excelbuttonclose" @click="onBtExportclose()">
                        <img src="../../assets/img/ExportCsv.jpg">
                    </div>
                   
        <div class="Myticket-table">
                <div id="myGrid" v-show="openload"  class="ag-theme-alpine"></div>
            
                <div id="myGridclose" v-show="closeload"  class="ag-theme-alpine"></div>
                                               
        </div>
        <Feedbackdetails v-if="FeedbackdetailsVisible" ref="toFeedbackdetails"></Feedbackdetails>
        <Feedbackdetailsopen v-if="FeedbackdetailsVisibleopen" ref="toFeedbackdetailsopen"></Feedbackdetailsopen>
    </div>
</template>

<script>
import Feedbackdetails from '@/components/commom/Feedbackdetails'
import Feedbackdetailsopen from '@/components/commom/Feedbackdetailsopen' 
import mainServices from "@/services/mainServices.js"
import moment from 'moment'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Vue from 'vue'

import {Grid} from 'ag-grid-community';

export default {
    name:"Myticket",
    components:{
        Feedbackdetails,
        Feedbackdetailsopen
    },
    data(){
        return{
            gridOptionsclose:null,
            gridOptions: null,
            gridApi: null,
            tickettype:"OpenCase",
            FeedbackdetailsVisible:false,
            FeedbackdetailsVisibleopen:false,
            openCasesdate:[],
            closeCasesdate:[],
            Imagesdate:[],
            filedate:[],
            currentPage: 1,
            pageSize: 8,           
            userrole:this.$store.state.IsManager,
            recordstatus:this.GLOBAL.recordstatus,
            tableHeight: 460,
            search: '',
            closeload:false,
            openload:true,
            closebutton:false,
            openbutton:true,
            CaseNumber:"",
            Status:"",
            username:"",
            IsManager:""                       
        }
    },mounted:function(){      
        var columnDefs;
        var columnDefsclose;
        if(this.IsManager == "true"){
            
            columnDefs = [
            {headerName: "Case Title", field: "CaseTitle",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case#", field: "CaseNumber",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Description", field: "Description",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true},hide:true},
            {headerName: "Case Owner", field: "CaseOwner",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Issue Date",valueFormatter:this.setDate, field: "IssueDate",sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Status", field: "Status",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Assigned Engineer", field: "AssignedEngineer",width:180,sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case Type", field: "CaseType",sortable:true,filter:true,width:140,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Severity", field: "Severity",sortable:true,filter:true,width:140,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Processing time (days)", field: "ProcessingTime",width:210,sortable:true,filter:'agNumberColumnFilter',filterParams: {
            suppressAndOrCondition:true
         }},
            {headerName: "Created On", field: "CreatedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }}
            ];

            columnDefsclose = [
            {headerName: "Case Title", field: "CaseTitle",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case#", field: "CaseNumber",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Description", field: "Description",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true},hide:true},
            {headerName: "Case Owner", field: "CaseOwner",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Issue Date", field: "IssueDate",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Closed On", field: "ClosedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Assigned Engineer", field: "AssignedEngineer",width:180,sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case Type", field: "CaseType",sortable:true,filter:true,width:140,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Severity", field: "Severity",sortable:true,filter:true,width:140,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Processing time (days)", field: "ProcessingTime",width:210,sortable:true,filter:'agNumberColumnFilter',filterParams: {
            suppressAndOrCondition:true
         }},
            {headerName: "Created On", field: "CreatedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }}
            ];
        }else{
            columnDefs = [
            {headerName: "Case Title", field: "CaseTitle",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case#", field: "CaseNumber",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Description", field: "Description",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true},hide:true},
            {headerName: "Issue Date", field: "IssueDate",sortable:true,valueFormatter:this.setDate,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Status", field: "Status",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Assigned Engineer", field: "AssignedEngineer",width:180,sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case Type", field: "CaseType",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Severity", field: "Severity",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Processing time (days)", field: "ProcessingTime",width:210,sortable:true,filter:'agNumberColumnFilter',filterParams: {
            suppressAndOrCondition:true
         }},
            {headerName: "Created On", field: "CreatedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }}
            ];

            columnDefsclose = [
            {headerName: "Case Title", field: "CaseTitle",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case#", field: "CaseNumber",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Description", field: "Description",sortable:true,filter:true,filterParams:{suppressAndOrCondition:true},hide:true},
            {headerName: "Issue Date", field: "IssueDate",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Closed On", field: "ClosedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }},
            {headerName: "Assigned Engineer", field: "AssignedEngineer",width:180,sortable:true,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Case Type", field: "CaseType",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Severity", field: "Severity",sortable:true,width:140,filter:true,filterParams:{suppressAndOrCondition:true}},
            {headerName: "Processing time (days)", field: "ProcessingTime",width:210,sortable:true,filter:'agNumberColumnFilter',filterParams: {
            suppressAndOrCondition:true
         }},
            {headerName: "Created On", field: "CreatedOn",valueFormatter:this.setDate,sortable:true,filter:'agDateColumnFilter',filterParams:{
                suppressAndOrCondition:true,
                comparator: function(filterLocalDateAtMidnight, cellValue) {
                        var dateAsString = cellValue;
                        //console.log(dateAsString);
                        if (dateAsString == null) {
                            return 0;
                        }

                        // In the example application, dates are stored as dd/mm/yyyy
                        // We create a Date object for comparison against the filter date
                        var formatdate =  moment(cellValue).format("DD/MM/yyyy");                        
                        var dateParts = formatdate.split('/');
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(day, month, year);
                        // Now that both parameters are Date objects, we can compare
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }}
            ];
        }
         
        const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
         const localeText ={
              noRowsToShow:"No data Found !"
         }   
         var username = this.username;
        var IsManager = this.IsManager;
        mainServices.GetCases(username,IsManager)
        .then(Response =>{
          console.log(Response.data)
          if(Response.isSuccess == true){
                    for (var i = 0; i < Response.data.length; i++) {//json类似一个数组，所以通过循环输出里面
                    if(Response.data[i].Status === "In Progress"){
                        var open = {
                            "CaseTitle" : Response.data[i].CaseTitle,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                            "CaseNumber" : Response.data[i].CaseNumber,
                            "CreatedOn" : moment(Response.data[i].CreatedOn).toDate(),
                            "IssueDate" : moment(Response.data[i].IssueDate).toDate(),
                            "CaseOwner" : Response.data[i].CaseOwner,
                            "Status" : Response.data[i].Status,
                            "CaseType" : Response.data[i].CaseType,
                            "Severity" : Response.data[i].Severity,
                            "AssignedEngineer" : Response.data[i].AssignedEngineer,
                            "ProcessingTime" : parseInt(Response.data[i].ProcessingTime),
                            "ClosedOn" : moment(Response.data[i].ClosedOn).toDate(),
                            "Description" : Response.data[i].Description
                         }
                         this.openCasesdate.push(open);
                    }else{
                        var close = {
                            "CaseTitle" : Response.data[i].CaseTitle,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                            "CaseNumber" : Response.data[i].CaseNumber,
                            "CreatedOn" : moment(Response.data[i].CreatedOn).toDate(),
                            "IssueDate" : moment(Response.data[i].IssueDate).toDate(),
                            "CaseOwner" : Response.data[i].CaseOwner,
                            "Status" : Response.data[i].Status,
                            "CaseType" : Response.data[i].CaseType,
                            "Severity" : Response.data[i].Severity,
                            "AssignedEngineer" : Response.data[i].AssignedEngineer,
                            "ProcessingTime" : parseInt(Response.data[i].ProcessingTime),
                            "ClosedOn" : moment(Response.data[i].ClosedOn).toDate(),
                            "Description" : Response.data[i].Description
                         }
                         this.closeCasesdate.push(close);
                    }
                         
                    }
                    console.log(this.openCasesdate);
                    console.log(this.closeCasesdate);
                    var rowData = this.openCasesdate;
                    var rowDataclose = this.closeCasesdate;
                    var that = this;  
                    // let the grid know which columns and what data to use
                    this.gridOptions = {
                    columnDefs: columnDefs,
                    rowData: rowData,
                    pagination:true,
                    localeText,
                    enableColResize: true,
                    paginationPageSize:10,
                    //floatingFilter:true,
                    defaultExportParams: true,
                    enableCellExpressions: true,
                    suppressExcelExport:true,
                    onRowClicked: function (event) {
                            console.log(event.data);
                                const loading = that.$loading({
                                                lock: true,
                                                text: 'Loading',
                                                spinner: 'el-icon-loading',
                                                background: 'rgba(0, 0, 0, 0.7)'
                                            });
                                            that.Imagesdate = []
                                            that.filedate = []           
                                            var CaseNumber =  event.data.CaseNumber
                                            var Status = event.data.Status           
                                            mainServices.GetCaseDetails(CaseNumber)
                                            .then(Response =>{
                                                if(Response.isSuccess == true){
                                                    for (var i = 0; i < Response.data.Files.length; i++) {//json类似一个数组，所以通过循环输出里面
                                                        var lengths = Response.data.Files[i].FileName.length;
                                                        var nametypes = Response.data.Files[i].FileName.substring(lengths-4,lengths);
                                                        var nametype = nametypes.toLowerCase();
                                                        console.log(nametype);
                                                        if(nametype == ".jpg" || nametype == ".png" || nametype == "jpeg"){
                                                            var objproject = {
                                                            "ImageName" : Response.data.Files[i].FileName,
                                                            "Image" : "data:image/png;base64,"+ Response.data.Files[i].FileBody
                                                            }
                                                            that.Imagesdate.push(objproject);
                                                        }else if(nametype == ".txt" || nametype == ".pdf"){
                                                            var fileobjproject = {
                                                            "FileName" : Response.data.Files[i].FileName,
                                                            "File" : "data:image/png;base64,"+ Response.data.Files[i].FileIcon
                                                            }
                                                            that.filedate.push(fileobjproject);
                                                        }
                                                         
                                                    }
                                                    console.log(that.Imagesdate);
                                                    console.log(that.filedate);
                                                const CaseDetails ={
                                                    CaseTitles:Response.data.CaseTitle,
                                                    CaseNumbers:Response.data.CaseNumber,
                                                    CreatedOns:Response.data.CreatedOn,
                                                    ClosedOns:Response.data.ClosedOn,
                                                    ProcessingTimes:Response.data.ProcessingTime,
                                                    IssueDates:Response.data.IssueDate,
                                                    CaseOwners:Response.data.CaseOwner,
                                                    AssignedEngineers:Response.data.AssignedEngineer,
                                                    Descriptions:Response.data.Description,
                                                    Severitys:Response.data.Severity,
                                                    PlatformAffecteds:Response.data.PlatformAffected,
                                                    OperationAffecteds:Response.data.OperationAffected,
                                                    CaseTypes:Response.data.CaseType,
                                                    MicrosoftTicketNumbers:Response.data.MicrosoftTicketNumber,
                                                    Resolutions:Response.data.Resolution,
                                                    ProductVersions:Response.data.ProductVersion,
                                                    ProductIds:Response.data.ProductId,
                                                    Imagesdate:that.Imagesdate,
                                                    Status:Status
                                                }
                                                that.$store.commit('GetCaseDetails',CaseDetails)
                                                console.log(that.$store.state.Imagesdate);
                                                if(that.tickettype === "ClosedCase"){
                                                loading.close();
                                                that.FeedbackdetailsVisible = true
                                                that.$nextTick(() => {
                                                that.$refs.toFeedbackdetails.init(that.Imagesdate,that.filedate)
                                                })
                                            }else if(that.tickettype === "OpenCase"){
                                                    loading.close();
                                                    that.FeedbackdetailsVisibleopen = true
                                                    that.$nextTick(() => {
                                                    that.$refs.toFeedbackdetailsopen.init(that.Imagesdate,that.filedate)
                                                }) 
                                            }
                                                }else{
                                                    that.$alert(Response.exception.Message, 'Message', {
                                                                confirmButtonText: 'OK'
                                                                });
                                                    loading.close();
                                                }                
                                            })
                                            .catch(error =>{
                                                console.log(error);
                                                that.$alert('GetCaseDetails failed, please try again', 'Message', {
                                                                    confirmButtonText: 'OK'
                                                                    });
                                                loading.close();
                                            })                            
                            /* that.CaseNumber = event.data.CaseNumber;
                            that.Status = event.data.Status;
                            alert(that.CaseNumber);
                            document.getElementById('openrowdate').click()  */                                        
                    }
                    };

                    this.gridOptionsclose = {
                    columnDefs: columnDefsclose,
                    rowData: rowDataclose,
                    pagination:true,
                    enableColResize: true,
                    localeText,
                    paginationPageSize:10,
                    //floatingFilter:true,
                    defaultExportParams: true,
                    enableCellExpressions: true,
                    suppressExcelExport:true,
                    onRowClicked: function (event) {
                                const loading = that.$loading({
                                                lock: true,
                                                text: 'Loading',
                                                spinner: 'el-icon-loading',
                                                background: 'rgba(0, 0, 0, 0.7)'
                                            });
                                            that.Imagesdate = []
                                            that.filedate = []           
                                            var CaseNumber =  event.data.CaseNumber
                                            var Status = event.data.Status           
                                            mainServices.GetCaseDetails(CaseNumber)
                                            .then(Response =>{
                                                if(Response.isSuccess == true){
                                                    for (var i = 0; i < Response.data.Files.length; i++) {//json类似一个数组，所以通过循环输出里面
                                                        var index = Response.data.Files[i].FileName.indexOf(".");
                                                        var nametype = Response.data.Files[i].FileName.substring(index+1);
                                                        if(nametype == "jpg" || nametype == "png"){
                                                            var objproject = {
                                                            "ImageName" : Response.data.Files[i].FileName,
                                                            "Image" : "data:image/png;base64,"+ Response.data.Files[i].FileBody
                                                            }
                                                            that.Imagesdate.push(objproject);
                                                        }else if(nametype == "txt" || nametype == "pdf"){
                                                            var fileobjproject = {
                                                            "FileName" : Response.data.Files[i].FileName,
                                                            "File" : "data:image/png;base64,"+ Response.data.Files[i].FileIcon
                                                            }
                                                            that.filedate.push(fileobjproject);
                                                        }
                                                         
                                                    }
                                                    console.log(that.Imagesdate);
                                                    console.log(that.filedate);
                                                const CaseDetails ={
                                                    CaseTitles:Response.data.CaseTitle,
                                                    CaseNumbers:Response.data.CaseNumber,
                                                    CreatedOns:Response.data.CreatedOn,
                                                    ClosedOns:Response.data.ClosedOn,
                                                    ProcessingTimes:Response.data.ProcessingTime,
                                                    IssueDates:Response.data.IssueDate,
                                                    CaseOwners:Response.data.CaseOwner,
                                                    AssignedEngineers:Response.data.AssignedEngineer,
                                                    Descriptions:Response.data.Description,
                                                    Severitys:Response.data.Severity,
                                                    PlatformAffecteds:Response.data.PlatformAffected,
                                                    OperationAffecteds:Response.data.OperationAffected,
                                                    CaseTypes:Response.data.CaseType,
                                                    MicrosoftTicketNumbers:Response.data.MicrosoftTicketNumber,
                                                    Resolutions:Response.data.Resolution,
                                                    ProductVersions:Response.data.ProductVersion,
                                                    ProductIds:Response.data.ProductId,
                                                    Imagesdate:that.Imagesdate,
                                                    Status:Status
                                                }
                                                that.$store.commit('GetCaseDetails',CaseDetails)
                                                console.log(that.$store.state.Imagesdate);
                                                if(that.tickettype === "ClosedCase"){
                                                loading.close();
                                                that.FeedbackdetailsVisible = true
                                                that.$nextTick(() => {
                                                that.$refs.toFeedbackdetails.init(that.Imagesdate,that.filedate)
                                                })
                                            }else if(that.tickettype === "OpenCase"){
                                                    loading.close();
                                                    that.FeedbackdetailsVisibleopen = true
                                                    that.$nextTick(() => {
                                                    that.$refs.toFeedbackdetailsopen.init(that.Imagesdate,that.filedate)
                                                }) 
                                            }
                                                }else{
                                                    that.$alert(Response.exception.Message, 'Message', {
                                                                confirmButtonText: 'OK'
                                                                });
                                                    loading.close();
                                                }                
                                            })
                                            .catch(error =>{
                                                console.log(error);
                                                that.$alert('GetCaseDetails failed, please try again', 'Message', {
                                                                    confirmButtonText: 'OK'
                                                                    });
                                                loading.close();
                                            })                         
                    }               
                    };


                    var eGridDiv = document.querySelector('#myGrid');
                    var eGridDivclose = document.querySelector('#myGridclose');

                    new Grid(eGridDiv, this.gridOptions);
                    new Grid(eGridDivclose, this.gridOptionsclose);
                    loading.close();                                   
          }else{
              this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
              loading.close();
          }
        })
        .catch(error =>{
          console.log(error);
          this.$alert('GetCases failed, please try again', 'Message', {
                        confirmButtonText: 'OK'
                    });
          loading.close();   
        })

        // specify the data
       
    },
    computed: {
        openCasesdates() {
            const search = this.search
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
            return this.openCasesdate.filter(data => {
                // some() 方法用于检测数组中的元素是否满足指定条件;
                // some() 方法会依次执行数组的每个元素：
                // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                // 如果没有满足条件的元素，则返回false。
                // 注意： some() 不会对空数组进行检测。
                // 注意： some() 不会改变原始数组。
                return Object.keys(data).some(key => {
                // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                return String(data[key]).toLowerCase().indexOf(search) > -1
                })
            })
            }
            return this.openCasesdate.slice( (this.currentPage -1) * this.pageSize, this.currentPage * this.pageSize) || [];
        },
         closeCasesdates() {
            const search = this.search
            if (search) {
            // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
            // 注意： filter() 不会对空数组进行检测。
            // 注意： filter() 不会改变原始数组。
            return this.closeCasesdate.filter(data => {
                // some() 方法用于检测数组中的元素是否满足指定条件;
                // some() 方法会依次执行数组的每个元素：
                // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                // 如果没有满足条件的元素，则返回false。
                // 注意： some() 不会对空数组进行检测。
                // 注意： some() 不会改变原始数组。
                return Object.keys(data).some(key => {
                // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                return String(data[key]).toLowerCase().indexOf(search) > -1               
                })
            })
            }
            return this.closeCasesdate.slice( (this.currentPage -1) * this.pageSize, this.currentPage * this.pageSize) || [];
        }
    },methods:{
        sizeToFit() {
        this.gridOptions.api.sizeColumnsToFit();
        },
        onBtExportopen(){
            this.gridOptions.api.exportDataAsCsv({allColumns:true,processCellCallback:this.setDates});
        },
        onBtExportclose(){
            this.gridOptionsclose.api.exportDataAsCsv({allColumns:true,processCellCallback:this.setDates});
        },ToClosedCase(){
            this.tickettype = "ClosedCase"          
            this.closeload = true
            this.openload = false
            this.closebutton = true
            this.openbutton = false
        },ToOpenCase(){
            this.tickettype = "OpenCase"
            this.openload = true
            this.closeload = false
            this.closebutton = false
            this.openbutton = true          
        },openrows(){
            alert(this.CaseNumber);
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.Imagesdate = []           
            var CaseNumber =  this.CaseNumber
            var Status = this.Status           
            mainServices.GetCaseDetails(CaseNumber)
            .then(Response =>{
                if(Response.isSuccess == true){
                    for (var i = 0; i < Response.data.Images.length; i++) {//json类似一个数组，所以通过循环输出里面
                         var objproject = {
                            "ImageName" : Response.data.Images[i].ImageName,
                            "Image" : "data:image/png;base64,"+ Response.data.Images[i].Image
                        }
                    this.Imagesdate.push(objproject);
                    console.log(this.Imagesdate);
                    }
                const CaseDetails ={
                    CaseTitles:Response.data.CaseTitle,
                    CaseNumbers:Response.data.CaseNumber,
                    CreatedOns:Response.data.CreatedOn,
                    ClosedOns:Response.data.ClosedOn,
                    ProcessingTimes:Response.data.ProcessingTime,
                    IssueDates:Response.data.IssueDate,
                    CaseOwners:Response.data.CaseOwner,
                    AssignedEngineers:Response.data.AssignedEngineer,
                    Descriptions:Response.data.Description,
                    Severitys:Response.data.Severity,
                    PlatformAffecteds:Response.data.PlatformAffected,
                    OperationAffecteds:Response.data.OperationAffected,
                    CaseTypes:Response.data.CaseType,
                    MicrosoftTicketNumbers:Response.data.MicrosoftTicketNumber,
                    Resolutions:Response.data.Resolution,
                    ProductVersions:Response.data.ProductVersion,
                    ProductIds:Response.data.ProductId,
                    Imagesdate:this.Imagesdate,
                    Status:Status
                }
                this.$store.commit('GetCaseDetails',CaseDetails)
                console.log(this.$store.state.Imagesdate);
                if(this.tickettype === "ClosedCase"){
                loading.close();
                this.FeedbackdetailsVisible = true
                this.$nextTick(() => {
                this.$refs.toFeedbackdetails.init(this.Imagesdate)
                })
            }else if(this.tickettype === "OpenCase"){
                    loading.close();
                    this.FeedbackdetailsVisibleopen = true
                    this.$nextTick(() => {
                    this.$refs.toFeedbackdetailsopen.init(this.Imagesdate)
                }) 
            }
                }else{
                    this.$alert(Response.exception.Message, 'Message', {
                                confirmButtonText: 'OK'
                                });
                    loading.close();
                }                
            })
            .catch(error =>{
                 console.log(error);
            })
        },        
        setDate(item){
            //console.log(item.value);
            //var times = Date.parse(item.value);
            // var newdate = row[column.property];
            // if(newdate == undefined){return ''};                      
            return moment(item.value).format("M/D/YYYY h:mm:ss A")
        },setDates(param){
            
            if(param.value == null){
                return param.value
            }else{
                var type = typeof(param.value)
                if(type == "object"){
                    console.log(typeof(param.value));
                    return moment(param.value).format("M/D/YYYY h:mm:ss A")
                }else{
                    return param.value
                }
            }
        }
        
    },created:function(){
      this.username = sessionStorage.getItem('username');
      this.IsManager = sessionStorage.getItem('IsManager');
    },beforeMount() {
	window.addEventListener('resize', this.getTbHeight)
    }

    
}

    window.openrow= function openrow(row){
         window.open("Feedbackdetailsopen.vue");
    }
    
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
    .Myticket{
        position: absolute;
        width:1200px;
        height: 760px;
    }
    .Myticket-name{
        position: absolute;
        top:40px;
        left: 4.17%;
        width:130px;
        height:33px;
        font-size:24px;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif;
        text-align: left;
    }
    
    .Myticket-OpenCase{
        position: absolute;
        top: 93px;
        left:4.17%;
        width:158px;
        height:50px;
        border-radius:4px 0px 0px 4px;       
        border:1px solid rgba(36,157,253,1);
        cursor: pointer;
        font-size:14px;
        color:rgba(36,157,253,1);
        line-height:52px;
        text-align: center; 
        font-family: 'Noto Sans TC', sans-serif;
    }    
    .Myticket-OpenCasecheck{
        position: absolute;
        top: 93px;
        left:4.17%;
        width:158px;
        height:50px;
        border-radius:4px 0px 0px 4px;
        background:rgba(36,157,253,1);
        border:1px solid rgba(36,157,253,1);
        font-size:14px;
        color:rgba(255,255,255,1);
        line-height:52px;
        text-align: center;
        font-family: 'Noto Sans TC', sans-serif; 
    }

    .Myticket-ClosedCase{
        position: absolute;
        top: 93px;
        left:17.42%;
        width:158px;
        height:50px;        
        border:1px solid rgba(36,157,253,1);
        cursor: pointer;
        font-size:14px;
        color:rgba(36,157,253,1);
        line-height:52px;
        text-align: center;
        font-family: 'Noto Sans TC', sans-serif;
    }
    
    .Myticket-ClosedCasecheck{
        position: absolute;
        top: 93px;
        left:17.42%;
        width:158px;
        height:50px;      
        background:rgba(36,157,253,1);
        border:1px solid rgba(36,157,253,1);
        font-size:14px;
        color:rgba(255,255,255,1);
        line-height:52px;
        text-align: center;
        font-family: 'Noto Sans TC', sans-serif; 
    }

    .Myticket-search{
        position: absolute;
        top: 150px;
        left:4.17%;
        width: 1100px;
        height: 70px;
        text-align: left;
        font-size:16px;
        font-family: 'Noto Sans TC', sans-serif;
        line-height: 70px;
    }
    .Myticket-search-text{
      position: absolute;
      top: 10px;
      left:100px;  
      width:460px;
      height:52px;
      background:rgba(255,255,255,1);
      font-family: 'Noto Sans TC', sans-serif;
      border-radius:4px;
      font-size:16px;
      border:1px solid rgba(0,0,0,0.15);
      padding-left: 12px;
    }

    .Excelbuttonopen{
        position: absolute;
        top: 93px;
        left:1080px;
        width:50px;
        height:50px;
        cursor: pointer;
    }
    .Excelbuttonopen img {
        width:50px;
        height:50px;
    }
    .Excelbuttonclose{
        position: absolute;
        top: 93px;
        left:1080px;
        width:50px;
        height:50px;
        cursor: pointer;
    }
    .Excelbuttonclose img {
        width:50px;
        height:50px;
    }

    .ag-theme-alpine{
        font-family: 'Noto Sans TC', sans-serif;
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
    }

    .ag-row{
       cursor: pointer; 
    }

    .el-button+.el-button {
    margin-left: 0px;
    }

    .Myticket-table{
        position: absolute;
        top: 180px;
        left:4.17%;
        width:1100px;
        height:450px;
        border-radius:4px 4px 0px 0px;
        border:1px solid rgba(232,232,232,1);
    }

    #myGrid{
        width:1100px;
        height:450px;
        font-family: 'Noto Sans TC', sans-serif;
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
    }

    #myGridclose{
        width:1100px;
        height:450px;
        font-family: 'Noto Sans TC', sans-serif;
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
    }

    .el-table thead{
        color:#000000;
       
    }
    .el-table{
        height:450px;
        overflow:auto;            
    }

    .el-table::before {   
     height: 0px; 
    }   

    .el-table tr{
         background: rgba(255,255,255,1);
    }
    
    .el-table__body-wrapper {
        cursor: pointer;
}
    .tableheigth{
        height: 486px;
    }

    .page{
        margin-top: 50px;
    }
    .count{
        margin-top: -77px;
        margin-left: 980px;
        width:130px;
        height:33px;
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:33px;
        font-family: 'Noto Sans TC', sans-serif;
    }
    .ag-input-field-input{
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    .ag-picker-field-wrapper{
        font-size:16px;
        font-weight:normal;
        color:rgba(51,51,51,1);
        font-family: 'Noto Sans TC', sans-serif;
    }

    /* .ag-header-cell-text {
        left: 70px;
        position: absolute;
    } */

     .ag-theme-balham [class^='ag-'],
.ag-theme-balham [class^='ag-']:focus,
.ag-theme-balham [class^='ag-']:after,
.ag-theme-balham [class^='ag-']:before {
    text-align: center;
}
 .ag-header-cell-text{
  text-align: center ;
  width: 100%;
  font-size: 14px;
}
</style>   