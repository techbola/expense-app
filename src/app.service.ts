import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from 'src/data';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report.find(
      (report) => report.type === type && report.id === id,
    );
  }

  createReport(type: ReportType, { amount, source }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
    const reportToUpdate = data.report.find(
      (report) => report.type === type && report.id === id,
    );

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (rep) => rep.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return reportToUpdate;
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
