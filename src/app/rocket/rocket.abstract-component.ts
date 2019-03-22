import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rocket, RocketStatus } from './rocket';
import { RocketService } from './rocket.service';
import { RocketModule } from './rocket.module';


export abstract class AbstractRocketComponent implements OnInit, OnDestroy {
  private rocketSubscription: Subscription;
  private rocketUpdatesSubscription: Subscription;

  RocketStatus = RocketStatus;
  rocket: Rocket;
  rocketService: RocketService;

  ngOnInit() {
    this.rocketService = RocketModule.injector.get(RocketService);
    this.rocketSubscription = this.rocketService.getRocket$.subscribe(rocket => {
      if (rocket && rocket !== this.rocket) {
        this.unsubscribeToRocketUpdates();
        this.rocketUpdatesSubscription = rocket.getUpdates$.subscribe(() => this.rocketHasBeenUpdated());
      }
      this.rocket = rocket;
    });
  }

  rocketHasBeenUpdated(): void {}

  private unsubscribeToRocketUpdates() {
    if (this.rocketUpdatesSubscription) {
      this.rocketUpdatesSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.rocketSubscription.unsubscribe();
    this.unsubscribeToRocketUpdates();
  }
}
