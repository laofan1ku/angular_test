/*
 * @Author: 老范
 * @Date: 2023-09-25 17:19:16
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-16 16:50:42
 * @Description: 请填写简介
 */
import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
// import { MyService } from '@/api/main';
import { MyService } from '@/api/main';
import { CommunicateService } from '@/app/communicate.service';
@Component({
  selector: 'app-tree',
  templateUrl: `./tree.component.html`,
  styleUrls: ['./tree.component.less'],
})
export class treeComponent implements OnInit {
  nodes = [
    {
      title: 'mongoDB',
      key: 'test',
      expanded: true,
      children: [
        // {
        //   title: 'xxxxxxxxxxxxxxxxx',
        //   key: 'xxxxxxxxxxx',
        //   isLeaf: true,
        // },
        // {
        //   title: 'xxxxxxxxxxxxxx',
        //   key: 'xxxxxxxxxxx',
        //   isLeaf: true,
        // },
        // {
        //   title: 'xxxxxxxxxxxx',
        //   key: 'xxxxxxxxxxx',
        //   isLeaf: true,
        // },
        // {
        //   title: 'xxxxxxxxxxx',
        //   key: 'xxxxxxxxxxx',
        //   isLeaf: true,
        // },
      ],
    },
    {
      title: 'mysql',
      key: 'test1',
      expanded: true,
      children: [
        {
          title: 'xxxxxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
        {
          title: 'xxxxxxxxxxx',
          key: 'xxxxxxxxxxx',
          isLeaf: true,
        },
      ],
    },
  ];
  defaultSelectedKeys = ['0-0-0'];
  constructor(private myService: MyService, private cs: CommunicateService) {}
  ngOnInit(): void {
    this.myService.getTreeListApi().subscribe((res) => {
      const data = res.data.map((i: any) => {
        return { title: i, key: i, isLeaf: true };
      });
      this.nodes[0].children = data;
      // this.defaultSelectedKeys = this.nodes[0].children[0];
    });
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log('event', event);

    const { keys, node } = event;
    if (node?.origin.isLeaf) {
      this.cs.sendData(keys![0]);
      // alert(keys![0]);
    }
  }
}
