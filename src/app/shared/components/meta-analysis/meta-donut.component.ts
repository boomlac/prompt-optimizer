import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { PromptAnalysisMeta } from '../../../core/models/prompt-analysis.model';
import { NgChartsModule } from 'ng2-charts';
import { Plugin } from 'chart.js';
@Component({
    selector: 'app-meta-donut',
    templateUrl: './meta-donut.component.html',
    styleUrls: ['./meta-donut.component.scss'],
    imports: [CommonModule, NgChartsModule]
})
export class MetaDonutComponent {

    @Input() meta: PromptAnalysisMeta = {
        clarity: 0,
        completeness: 0,
        structure: 0,
        context: 0,
        risk: 0
    };

    labels = Object.keys(this.meta) as (keyof PromptAnalysisMeta)[];

    chartType: ChartType = 'doughnut';
    centerTextPlugin: Plugin = {
        id: 'centerText',
        afterDraw(chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const value = chart.config.data.datasets[0].data[0] as number;

            ctx.save();
            ctx.font = 'bold 20px sans-serif';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${value}%`, chartArea.left + chartArea.width / 2, chartArea.top + chartArea.height / 2);
            ctx.restore();
        }
    };

    getChartData(value: number) {
        return {
            datasets: [
                {
                    data: [value, 100 - value],
                    backgroundColor: ['#4CAF50', '#E0E0E0'],
                    borderWidth: 0,
                    cutout: '70%',
                    rotation: -90
                }
            ]
        };
    }

    chartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        }
    };

}
