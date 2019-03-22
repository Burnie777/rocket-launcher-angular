import { Component } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class DashboardPositionComponent extends AbstractRocketComponent {
  points: string;
  position: any;
  viewBox: string = '0 0 40000 30000';

  rocketHasBeenUpdated(): void {
    if (this.rocket.positionOverTime.length > 1) {
      // Points
      this.points = '';
      for (const [position, altitude] of this.rocket.positionOverTime) {
        const x = position + 5000;
        const y = 30000 - altitude;
        this.points += ` ${x},${y}`;
        this.position = {x, y};
      }
    } else {
      this.points = null;
    }
  }
}
