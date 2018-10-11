import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  i = 1;
  editCache = {};
  dataSet = [];
  constructor() {

  }

  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }
  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    Object.assign(this.dataSet[index], this.editCache[key].data);
    // this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[key].edit = false;
  }

  updateEditCache(): void {
    this.dataSet.forEach(item => {
      if (!this.editCache[item.key]) {
        this.editCache[item.key] = {
          edit: false,
          data: { ...item }
        };
      }
    });
  }
  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        type: '正常操作',
        jiahao: '架号0' + i + 1,
        caohao: '槽号0' + i + 1,
        panhao: '盘号0' + i + 1,
        vegetables: '土豆',
        date: '2018-10-10',
        checked: false
      });
    }
    this.updateEditCache()
  }

}
