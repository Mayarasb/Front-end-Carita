import { Component } from '@angular/core';
import { NgApexchartsModule, ApexChart } from 'ng-apexcharts';

@Component({
  selector: 'app-grafico-apex',
  standalone: true,
  imports: [NgApexchartsModule],
  template: `
    <apx-chart 
      [series]="series" 
      [chart]="chart"
      [xaxis]="xaxis">
    </apx-chart>
  `
})
export class GraficoApexComponent {
  series = [{
    name: 'Vendas',
    data: [10, 20, 15, 30]
  }];
  chart: Partial<ApexChart> = {
    type: 'bar',
    height: 350
  };
  xaxis = {
    categories: ['Jan', 'Fev', 'Mar', 'Abr']
  };
}