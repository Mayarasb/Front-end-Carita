import { Component } from '@angular/core';
import { BaseChartDirective  } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent {
  public chartData: ChartData<'bar'> = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [
      { data: [10, 20, 30, 40], label: 'Vendas' }
    ]
  };
  public chartType: ChartType = 'bar';
}