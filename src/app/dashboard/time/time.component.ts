import { Component, HostListener } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class DashboardTimeComponent extends AbstractRocketComponent {}
