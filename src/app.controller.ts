import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuid } from 'uuid';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.find(
      (report) => report.type === reportType && report.id === id,
    );
  }

  @Post()
  createReport(
    @Body() { amount, source }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
    @Param('id') id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const report = data.report.find(
      (report) => report.type === reportType && report.id === id,
    );

    if (!report) return;

    // const reportIndex = data.report.findIndex((rep) => rep.id === report.id);

    // data.report[reportIndex] = {
    //   ...data.report[reportIndex],
    //   ...body,
    // };

    report.source = body.source;
    report.amount = body.amount;
    return report;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
