/*
 * @Author: 老范
 * @Date: 2023-09-25 17:19:16
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-11 10:59:50
 * @Description: 请填写简介
 */
import { Component, OnInit } from '@angular/core';
import { MyService } from '../../api/main';
import { CommunicateService } from '../communicate.service';
interface listType {
  _id: string;
  CurrentTime: number;
  SimData: any[];
  TimeStamp: number;
}
@Component({
  selector: 'app-dialog',
  templateUrl: `./dialog.component.html`,
  styleUrls: ['./dialog.component.less'],
})
export class dialogComponent implements OnInit {
  jsonData = {
    name: 'John',
    age: 30,
    city: 'New York',
    hobbies: ['Reading', 'Traveling', 'Coding'],
    address: {
      street: '123 Main St',
      zip: '10001',
    },
  };
  isVisible: boolean = false;
  preVisible: boolean = false;
  total: number = 0;
  list: listType[] = [];
  loading: boolean = false;
  listQuery = {
    tableName: '',
    pageIndex: 1,
    pageSize: 10,
  };
  constructor(private myService: MyService, private cs: CommunicateService) {}
  ngOnInit(): void {
    this.cs.ob.subscribe((msg) => {
      this.listQuery.tableName = msg;
      this.getList();
      this.isVisible = true;
    });
  }
  handleCancel() {
    this.isVisible = false;
  }
  handleOk() {
    this.isVisible = false;
  }
  // 表格数据
  getList() {
    this.loading = true;
    this.myService.getDocumentsApi(this.listQuery).subscribe((res) => {
      this.list = res.data;
      this.total = res.total;
      this.loading = false;
    });
  }
  // 预览
  preview(data: any) {
    this.preVisible = true;
    this.jsonData = data;
  }
  // 下载文件
  downLoadFile(type: string) {
    this.myService[type === 'JSON' ? 'exportFileJSONApi' : 'exportFileCSVApi'](
      this.listQuery.tableName
    ).subscribe((res) => {
      if (type === 'CSV') this.downloadCSVFile(res);
      else this.downloadJsonFile(JSON.stringify(res));
    });
  }
  // 分页
  handleChangeIndex(index: number) {
    this.listQuery.pageIndex = index;
    this.getList();
  }
  handleChangeSize(size: number) {
    this.listQuery.pageIndex = 1;
    this.listQuery.pageSize = size;
    this.getList();
  }
  downloadCSVFile(blob: Blob, filename: string = 'data'): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  downloadJsonFile(data: string, filename: string = 'data'): void {
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
