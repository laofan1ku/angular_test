/*
 * @Author: 老范
 * @Date: 2023-09-25 17:19:16
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-13 09:42:47
 * @Description: 请填写简介
 */
import { Component, OnInit } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-monokai'; // 语言模式
import 'ace-builds/src-noconflict/mode-json'; // 语言模式
import { MyService } from '../../api/main';
import { CommunicateService } from '../communicate.service';
interface listType {
  _id: string;
  currenttime: number;
  SimData: any[];
  TimeStamp: number;
}
@Component({
  selector: 'app-dialog',
  templateUrl: `./dialog.component.html`,
  styleUrls: ['./dialog.component.less'],
})
export class dialogComponent implements OnInit {
  jsonData = [
    {
      name: 'John',
      age: 30,
      city: 'New York',
      hobbies: ['Reading', 'Traveling', 'Coding'],
      address: {
        street: '123 Main St',
        zip: '10001',
      },
    },
    {
      name: 'John',
      age: 30,
      city: 'New York',
      hobbies: ['Reading', 'Traveling', 'Coding'],
      address: {
        street: '123 Main St',
        zip: '10001',
      },
    },
    {
      name: 'John',
      age: 30,
      city: 'New York',
      hobbies: ['Reading', 'Traveling', 'Coding'],
      address: {
        street: '123 Main St',
        zip: '10001',
      },
    },
  ];
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
  editor: any = null;
  constructor(private myService: MyService, private cs: CommunicateService) {}
  ngOnInit(): void {
    this.cs.ob.subscribe((msg) => {
      this.listQuery.tableName = msg;
      this.getList();
      this.isVisible = true;
    });
  }
  // json预览打开之后
  preAfterOpen() {
    if (!this.editor) {
      this.editor = ace.edit('editor', {
        theme: 'ace/theme/monokai', // 设置编辑器主题
        fontSize: 16,
        mode: 'ace/mode/json', // 设置 JSON 语法高亮模式
      });
    }
    // editor.setTheme('ace/theme/monokai'); // 设置编辑器主题
    // editor.session.setMode('ace/mode/json'); // 设置 JSON 语法高亮模式
    const jsonString = JSON.stringify(this.jsonData, null, 2);
    // 设置 JSON 数据到编辑器
    this.editor.setValue(jsonString);
    // 取消选中整个文本
    this.editor.clearSelection();
    // 默认折叠 JSON 数据
    this.editor.session.foldAll(1); // 1 表示折叠
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
