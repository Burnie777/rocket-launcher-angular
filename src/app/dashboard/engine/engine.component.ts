import { Component } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class DashboardEngineComponent extends AbstractRocketComponent {}
