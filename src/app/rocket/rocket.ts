import { RocketService } from './rocket.service';
import { Subject, Observable } from 'rxjs';


export enum RocketStatus {
  READY = 'ready',
  LAUNCHED = 'launched',
  EXPLODED = 'exploded',
  ABORTED = 'aborted',
  FAILED = 'failed',
  SUCCEED = 'succeed',
}


export class Rocket {
  static STATUSES = RocketStatus;

  private updatesSource: Subject<void> = new Subject<void>();
  getUpdates$: Observable<void> = this.updatesSource.asObservable();
  status: RocketStatus = RocketStatus.READY;

  // Mass
  mass = 0;

  // Engine and fuel
  thrust = 0;
  thrustPercentage = 0;
  fuelMass = 0;
  fuelPercentage = 0;
  massFlow = 0;

  // Acceleration
  accelerationX = 0;
  accelerationY = 0;

  // Velocity
  velocityX = 0;
  velocityY = 0;

  // Altitude
  altitude = 0;
  minAltitude = 0;
  maxAltitude = 0;

  // Position
  position = 0;
  minPosition = 0;
  maxPosition = 0;

  // Gyro
  angle = 0;

  // Flight information
  flightTime = 0;
  vibration = 0;
  gravityForce = 0;
  drag = 0;

  // Position Chart
  positionOverTime = [];

  constructor(
    private service: RocketService,
    public uuid: string,
  ) {}

  deploySatellite(): void {
    this.service.deploySatellite(this).subscribe();
  }

  increaseThrust(): void {
    this.service.increaseThrust(this).subscribe();
  }

  decreaseThrust(): void {
    this.service.decreaseThrust(this).subscribe();
  }

  rotateLeft(): void {
    this.service.rotateLeft(this).subscribe();
  }

  rotateRight(): void {
    this.service.rotateRight(this).subscribe();
  }

  abort(): void {
    this.service.abort(this).subscribe();
  }

  /** Websocket: update rocket attributes from websocket */
  update(message: any): void {
    const data = message.data;

    if (data.flight_time >= this.flightTime) {
      // Ignore message in case it came late

      this.status = data.status;

      // Engine and fuel
      this.thrust = data.thrust;
      this.thrustPercentage = data.thrust_percentage;
      this.fuelMass = data.fuel_mass;
      this.fuelPercentage = data.fuel_percentage;
      this.massFlow = data.mass_flow;

      // Acceleration
      this.accelerationX = data.accelerometer.acceleration.x;
      this.accelerationY = data.accelerometer.acceleration.y;

      // Velocity
      this.velocityX = data.accelerometer.velocity.x;
      this.velocityY = data.accelerometer.velocity.y;

      // Altitude
      this.altitude = data.gps.altitude;
      this.minAltitude = Math.min(this.minAltitude, this.altitude);
      this.maxAltitude = Math.max(this.maxAltitude, this.altitude);

      // Position
      this.position = data.gps.position;
      this.minPosition = Math.min(this.minPosition, this.position);
      this.maxPosition = Math.max(this.maxPosition, this.position);

      // Gyro
      this.angle = data.gyro.angle;

      // Flight information
      this.flightTime = data.flight_time;
      this.vibration = data.vibration;
      this.gravityForce = data.gravity_force;
      this.drag = data.drag;

      // Chart Position
      this.positionOverTime.push([this.position, this.altitude]);

      // Emit and stop updates
      this.updatesSource.next();
      if (this.status === RocketStatus.LAUNCHED && data.status !== RocketStatus.LAUNCHED) {
        this.updatesSource.complete();
      }
    }
  }
}
