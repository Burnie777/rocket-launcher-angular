import { Component } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-gyro',
  templateUrl: './gyro.component.html',
  styleUrls: ['./gyro.component.scss']
})
export class DashboardGyroComponent extends AbstractRocketComponent {
  totalLines = 36;
  lines = Array.from(Array(this.totalLines).keys()).map(i => i * (180 / this.totalLines));
}
