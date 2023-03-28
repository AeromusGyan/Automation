import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'applicaion/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  constructor() { }
  
  public exportAsExcelFile(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: any[],
    json: any[],
    // footerData: any,
    excelFilename: string,
    sheetName: string
  ) {
    const header = headersArray;
    const data = json;

    // create workbook and worksheet
    const workbook = new Workbook();
    workbook.creator = 'Infosys Automation System';
    workbook.lastModifiedBy = 'Infosys Automation System';
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);

    // Add Header Row
    // worksheet.addRow([]);
    // worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
    // worksheet.getCell('A1').value = reportHeading;
    // worksheet.getCell('A1').alignment = { horizontal: 'center' };
    // worksheet.getCell('A1').font = { size: 15, bold: true };
    // if (reportSubHeading !== '') {
    //   worksheet.addRow([]);
    //   worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '2');
    //   worksheet.getCell('A1').value = reportSubHeading;
    //   worksheet.getCell('A1').alignment = { horizontal: 'center' };
    //   worksheet.getCell('A1').font = { size: 12, bold: false };
    // }
    // worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);
    // worksheet.autoFilter = {
    //   from:'B3',
    //   to: 'J3'
    // }
    // Cell Style : Fill and Brother
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.font = { size: 12, bold: true };
      cell.alignment = { horizontal: 'center' };
      cell.
      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
      
    });
    // Get all columns from json
    let columnArray: any[];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnArray = Object.keys(json[key]);
      }
    }
    // Add Data and Conditiional Formatting
    data.forEach((element: any) => {
      const eachRow: any[] = [];
      columnArray.forEach((column) => {
        eachRow.push(element[column]);
      });
      if (element.isDeleted === 'Y') {
        const deletedRow = worksheet.addRow(eachRow);
        deletedRow.eachCell((cell) => {
          cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
          cell.alignment = { horizontal: 'center' };
        });
      }
      else {
        worksheet.addRow(eachRow);
      }
    });
    worksheet.addRow([]);
    // Footer Data Row
    // if(footerData != null){
    //   footerData.forEach((element:any)=>{
    //     const eachRow:any[] = [];
    //     element.forEach((val:any)=>{
    //       eachRow.push(val);
    //     });
    //     const footerRow = worksheet.addRow(eachRow);
    //     footerRow.eachCell((cell) =>{
    //       cell.font = {bold:true};
    //     });
    //   });
    // }

    // Save Excel file
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      fs.saveAs(blob, excelFilename + EXCEL_EXTENSION);
    });
  }

  private numToAlpha(num: number) {
    let alpha = '';
    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
    }
    return alpha;
  }
}
