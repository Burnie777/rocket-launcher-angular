import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'secondsToTime'})
export class SecondsToTimePipe implements PipeTransform {
  private toDigits(value, digits = 2): string {
    return `000${value}`.slice(-digits);
  }

  transform(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds =  Math.floor(timeInSeconds) % 60;
    return `00:${this.toDigits(minutes)}:${this.toDigits(seconds)}`;
  }
}
