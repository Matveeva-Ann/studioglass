import { Component } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss']
})
export class GoodsTableComponent {
  public goodsArr:IGoodsResponse[] = [];

  constructor(
    private goodsService: GoodsService,
  ){}

  ngOnInit(): void {
    this.getAllGoods();
  }

  getAllGoods() {
    this.goodsService.getGoods().subscribe((data) => {
      this.goodsArr = data as IGoodsResponse[];
    });
  }

  edit(product:IGoodsResponse){
  //   // this.sendEditProduct.emit(product);
  }

  delete(product: IGoodsResponse){
    this.goodsService.deleteGoods(product.id).then(() => {
      console.log(this.goodsArr)
      this.getAllGoods();
    });
  }

}



// public dataArr = [
//   {
//     name: 'Скляні двері для душу STENLI',
//     category: ' SHOWER BOXES ',
//     description: 'Для створення кожної моделі душової системи ми використовуємо виключно зразки Європейського виробництва, що мають ґатунок якості EU1. SAINT-GOBAIN float glass, SAINT-GOBAIN SATINOVO MATT - це основні варіації скла, котрі вже давно запали до душі нашим клієнтам. Товщина становить 8 мм, завдяки чому конструкція більш стійка до зовнішніх подразників.',
//     size: '2000 1000 500',
//     price: '17955',
//     img: 'https://studioglass.ua/uploads/products/930X930/stenli-930.webp',
//   },
//   {
//     name: 'Скляні двері для душу STENLI',
//     category: ' SHOWER BOXES ',
//     description: 'Для створення кожної моделі душової системи ми використовуємо виключно зразки Європейського виробництва, що мають ґатунок якості EU1. SAINT-GOBAIN float glass, SAINT-GOBAIN SATINOVO MATT - це основні варіації скла, котрі вже давно запали до душі нашим клієнтам. Товщина становить 8 мм, завдяки чому конструкція більш стійка до зовнішніх подразників.',
//     size: '2000 1000 500',
//     price: '17955',
//     img: 'https://studioglass.ua/uploads/products/930X930/stenli-930.webp',
//   },
//   {
//     name: 'Скляні двері для душу STENLI',
//     category: ' SHOWER BOXES ',
//     description: 'Для створення кожної моделі душової системи ми використовуємо виключно зразки Європейського виробництва, що мають ґатунок якості EU1. SAINT-GOBAIN float glass, SAINT-GOBAIN SATINOVO MATT - це основні варіації скла, котрі вже давно запали до душі нашим клієнтам. Товщина становить 8 мм, завдяки чому конструкція більш стійка до зовнішніх подразників.',
//     size: '2000 1000 500',
//     price: '17955',
//     img: 'https://studioglass.ua/uploads/products/930X930/stenli-930.webp',
//   }
// ]