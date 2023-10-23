/*
 * @Author: 老范
 * @Date: 2023-09-25 17:19:16
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-23 10:36:15
 * @Description: 请填写简介
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as ace from 'ace-builds';
import * as dayjs from 'dayjs';
import 'ace-builds/src-noconflict/theme-monokai'; // 主题
import 'ace-builds/src-noconflict/mode-json'; // 语言模式
import { MainService } from '../../api/main';
import { CommunicateService } from '../communicate.service';
import { NonNullableFormBuilder } from '@angular/forms';
interface listType {
  currenttime: number;
  SimData: any[];
  index: number;
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
  startTime: Date | null | number | string = null;
  endTime: Date | null | number | string = null;
  minTime: Date | null | number | string = null;
  maxTime: Date | null | number | string = null;
  modelList: any = {
    label: '模型选择',
    allChecked: false,
    indeterminate: false,
    list: [],
  };
  paramsList: any = {
    label: '参数选择',
    allChecked: false,
    indeterminate: false,
    list: [],
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private MainService: MainService,
    private cs: CommunicateService,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.cs.ob.subscribe((msg) => {
      this.listQuery.tableName = msg;
      this.getList();
      this.isVisible = true;
    });
  }
  // 全选更新之后
  updateAllChecked(e: any, key: string, id: number = 0) {
    const arr: any[] = [];
    switch (key) {
      case 'model':
        this.modelList.list.forEach((item: any) => {
          item.checked = e;
          if (e) {
            arr.push({
              id: item.ID,
              label: item.InstanceName,
              indeterminate: false,
              allChecked: false,
              list: this.getAllKeys(item),
            });
          }
        });
        this.paramsList.list = e ? arr : [];
        break;
      case 'params':
        this.paramsList.list.forEach((item: any) => {
          item.allChecked = e;
          item.list.forEach((i: any) => {
            i.checked = e;
          });
        });

        break;
      case 'modelParamsAll':
        this.paramsList.list.forEach((item: any) => {
          if (id === item.id) {
            item.list.forEach((i: any) => {
              i.checked = e;
            });
          }
        });
        this.paramsList.allChecked = this.paramsList.list.every(
          (i: any) => i.allChecked
        );
        break;
      default:
        break;
    }
  }
  getAllKeys(obj: any) {
    const keys: any[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key !== 'checked') keys.push({ label: key, checked: false });
        if (typeof obj[key] === 'object') {
          keys.push(...this.getAllKeys(obj[key])); // 递归获取嵌套对象的键
        }
      }
    }
    return keys;
  }
  updateCheckedBasedOnIds(a: any, b: any) {
    for (let i = 0; i < a.length; i++) {
      const idA = a[i];
      const itemB = b.find((item: any) => item.ID === idA);
      if (itemB) {
        // 如果a的id在b数组中，设置itemB的checked属性为true
        itemB.checked = true;
      } else {
        // 如果a的id不在b数组中，设置itemB的checked属性为false
        const indexB = b.findIndex((item: any) => item.ID === idA);
        if (indexB !== -1) {
          b[indexB].checked = false;
        }
      }
    }
    this.compareAndModifyArrays(b, this.paramsList.list);
  }
  compareAndModifyArrays(a: any, b: any) {
    for (let i = 0; i < a.length; i++) {
      const idA = a[i].ID;
      if (a[i].checked && !b.find((i: any) => i.id === idA)) {
        b.push({
          id: a[i].ID,
          label: a[i].InstanceName,
          indeterminate: false,
          allChecked: false,
          list: this.getAllKeys(a[i]),
        });
      } else {
        const find = b.findIndex((i: any) => i.id === idA);
        if (!a[i].checked && find !== -1) b.splice(find, 1);
      }
    }
  }
  // 选择单个
  updateSingleChecked(e: any, key: string, id: number = 0): void {
    switch (key) {
      case 'model':
        this.updateCheckedBasedOnIds(e, this.modelList.list);
        this.modelList.allChecked = e.length === this.modelList.list.length;
        this.paramsList.allChecked = this.areAllCheckedTrue(
          this.paramsList.list
        );
        break;
      case 'params':
        break;
      case 'paramsItem':
        this.paramsList.list.forEach((item: any) => {
          if (id === item.id) {
            item.allChecked = item.list.every((i: any) => i.checked);
          }
        });
        this.paramsList.allChecked = this.areAllCheckedTrue(
          this.paramsList.list
        );
        break;
      default:
        break;
    }
  }
  areAllCheckedTrue(arr: any) {
    return arr.every(function (item: any) {
      if (item.list && Array.isArray(item.list)) {
        // 使用 every 方法检查 list 数组中的 checked 字段是否都为 true
        return item.list.every(function (subItem: any) {
          return subItem.checked === true;
        });
      }
      // 如果 list 不存在或不是数组，则返回 false
      return false;
    });
  }
  // 关闭之后
  afterClose() {
    this.showDownloadConfig = false;
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
      // this.list = res.data;
      this.list = res;
      // this.total = res.total;
      this.loading = false;
    });
  }
  // 搜索
  search() {
    this.MainService.getModelListApi({
      // tableName: this.listQuery.tableName,
      tableName: 'datasimulation20230919171432202309191714233600s320',
    }).subscribe((res) => {
      this.modelList.list = res.map((i: any) => {
        return { ...i, checked: false };
      });
      this.startTime = dayjs(res.minTime).format('YYYY-MM-DD HH:mm:ss');
      this.endTime = dayjs(res.maxTime).format('YYYY-MM-DD HH:mm:ss');
      this.minTime = dayjs(res.minTime).format('YYYY-MM-DD HH:mm:ss');
      this.maxTime = dayjs(res.maxTime).format('YYYY-MM-DD HH:mm:ss');
      this.modelList.allChecked = false;
      this.modelList.indeterminate = false;
      this.paramsList.allChecked = false;
      this.paramsList.indeterminate = false;
    });
  }
  // 显示现在设置
  downloadConfig() {
    this.showDownloadConfig = !this.showDownloadConfig;
    if (this.showDownloadConfig) this.search();
  }
  // 预览
  preview(data: any) {
    this.preVisible = true;
    this.jsonData = data;
  }
  // 下载文件
  downLoadFile(type: string) {
    const obj = {
      3: ['ID', 'InstanceName', 'init_latitude', 'init_longitude'],
    };
    this.MainService[
      type === 'JSON' ? 'exportFileJSONApi' : 'exportFileCSVApi'
    ]({
      tableName: this.listQuery.tableName,
      modelInfos: JSON.stringify(obj),
    }).subscribe((res) => {
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
