const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = 'app/grpc/ReportService.proto';
const reportService = require('../report/reportService');

const reportProto = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

module.exports =
    [
        constructReportService
    ];


function handleCall(promise, callback) {
    return promise.then(function (data) {
        callback(null, data);
    }).catch(function (err) {
        callback(null, err)
    });
}

function constructReportService(server) {
    server.addService(reportProto.messages.reports.ReportService.service, {
        getScheduledReport,
        scheduleReport,
        getAllScheduledReportsByUser,
        getAllScheduledReportsCountsByUser,
        updateScheduledReport,
        deleteScheduledReport,
        getScheduleReportLogs,
        executeReport,
        searchReports
    })
}

function searchReports(call, callback) {
    handleCall(reportService.searchReports(call.request), callback);
}

function executeReport(call, callback) {
    handleCall(reportService.executeReport(call.request), callback);
}

function getScheduleReportLogs(call, callback) {
    handleCall(reportService.getScheduleReportLogs(call.request), callback);
}

function getScheduledReport(call, callback) {
    handleCall(reportService.getScheduledReport(call.request), callback);
}

function getAllScheduledReportsByUser(call, callback) {
    handleCall(reportService.getAllScheduledReportForUser(call.request), callback);
}

function scheduleReport(call, callback) {
    handleCall(reportService.scheduleReport(call.request), callback);
}

function getAllScheduledReportsCountsByUser(call, callback) {
    handleCall(reportService.getScheduledReportCountsForUser(call.request), callback);
}

function updateScheduledReport(call, callback) {
    handleCall(reportService.updateScheduledReport(call.request), callback);
}

function deleteScheduledReport(call, callback) {
    handleCall(reportService.deleteScheduledReport(call.request), callback);
}