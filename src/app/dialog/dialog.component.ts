/*
 * @Author: 老范
 * @Date: 2023-09-25 17:19:16
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-17 13:55:53
 * @Description: 请填写简介
 */
import { Component, OnInit } from '@angular/core';
import * as ace from 'ace-builds';
import * as dayjs from 'dayjs';
import 'ace-builds/src-noconflict/theme-monokai'; // 主题
import 'ace-builds/src-noconflict/mode-json'; // 语言模式
import { random, cloneDeep } from 'lodash'; // 只导入需要的函数
import { MainService } from '../../api/main';
import { CommunicateService } from '../communicate.service';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
interface listType {
  currenttime: number;
  SimData: any[];
  index: number;
}
interface selectListType {
  id: number;
  label: string;
  allChecked: boolean;
  indeterminate: boolean;
  list: {
    value: number;
    label: string;
    checked: boolean;
  }[];
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
  showDownloadConfig: boolean = false;
  total: number = 100;
  list: listType[] = [];
  loading: boolean = false;
  listQuery = {
    tableName: '',
    pageIndex: 1,
    pageSize: 10,
  };
  editor: any = null;
  validateForm: FormGroup<{
    startTime: FormControl<string>;
    endTime: FormControl<string>;
    modelName: FormControl<string>;
    paramsName: FormControl<string>;
  }> = this.fb.group({
    startTime: [''],
    endTime: [''],
    modelName: [''],
    paramsName: [''],
  });
  selectList: selectListType[] = [
    {
      id: 1,
      label: '模型选择',
      allChecked: false,
      indeterminate: false,
      list: [],
    },
    {
      id: 2,
      label: '参数选择',
      allChecked: false,
      indeterminate: false,
      list: [],
    },
  ];
  constructor(
    private MainService: MainService,
    private cs: CommunicateService,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      for (let index = 0; index < random(1, 20); index++) {
        this.selectList[0].list.push({
          value: index,
          label: '循迹导弹' + index,
          checked: false,
        });
      }
      for (let index = 0; index < random(1, 20); index++) {
        this.selectList[1].list.push({
          value: index,
          label: 'key_' + index,
          checked: false,
        });
      }
    }, 10 * 1000);
    this.cs.ob.subscribe((msg) => {
      this.listQuery.tableName = msg;
      this.getList();
      this.isVisible = true;
    });
  }
  // 全选更新之后
  updateAllChecked(id: number) {
    this.selectList.forEach((item) => {
      if (item.id === id) {
        item.indeterminate = false;
        item.list = item.list.map((i: any) => ({
          ...i,
          checked: item.allChecked,
        }));
      }
    });
  }
  // 选择单个
  updateSingleChecked(value: number[], id: number): void {
    this.selectList.forEach((item) => {
      if (item.id === id) {
        console.log(item.list);
        if (item.list.every((i) => !i.checked)) {
          item.allChecked = false;
          item.indeterminate = false;
        } else if (item.list.every((i) => i.checked)) {
          item.allChecked = true;
          item.indeterminate = false;
        } else {
          item.indeterminate = true;
        }
      }
    });
  }
  // 关闭之后
  afterClose() {
    this.showDownloadConfig = false;
    this.selectList.forEach((item) => {
      item.allChecked = false;
      item.indeterminate = false;
      item.list.forEach((i) => {
        i.checked = false;
      });
    });
  }
  // json预览打开之后
  preAfterOpen() {
    const editor = ace.edit('editor', {
      theme: 'ace/theme/monokai', // 设置编辑器主题
      fontSize: 16,
      mode: 'ace/mode/json', // 设置 JSON 语法高亮模式
    });
    const jsonString = JSON.stringify(this.jsonData, null, 2);
    // 设置 JSON 数据到编辑器
    editor.setValue(jsonString);
    // 取消选中整个文本
    editor.clearSelection();
    // 默认折叠 JSON 数据
    editor.session.foldAll(1); // 1 表示折叠
  }
  handleClose() {
    this.isVisible = false;
  }
  // 表数据
  getList() {
    this.loading = true;
    this.MainService.getDocumentsApi(this.listQuery).subscribe((res) => {
      console.log('res', res);

      // this.list = res.data;
      this.list = res;
      // this.total = res.total;
      this.loading = false;
    });
  }
  // 搜索
  search() {
    this.MainService.getModelListApi(this.validateForm.value).subscribe(
      (res) => {
        this.selectList.forEach((item) => {
          item.allChecked = false;
          item.indeterminate = false;
          item.list.forEach((i) => {
            i.checked = false;
          });
        });
      }
    );
  }
  // 显示现在设置
  downloadConfig() {
    this.showDownloadConfig = !this.showDownloadConfig;
  }
  // 预览
  preview(data: any) {
    this.preVisible = true;
    this.jsonData = data;
  }
  // 下载文件
  downLoadFile(type: string) {
    const params = cloneDeep(this.validateForm.value);
    params.startTime = params.startTime
      ? dayjs(params.startTime).format('YYYY-MM-DD HH:mm:ss')
      : '';
    params.endTime = params.endTime
      ? dayjs(params.endTime).format('YYYY-MM-DD HH:mm:ss')
      : '';
    // console.log(...params);
    this.MainService[
      type === 'JSON' ? 'exportFileJSONApi' : 'exportFileCSVApi'
    ](this.listQuery.tableName).subscribe((res) => {
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
