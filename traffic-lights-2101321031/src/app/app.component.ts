import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { FlexDirection } from './shared/enums/flex-direction.enum';
import { TrafficLightState } from './shared/enums/traffic-light-state.enum';
import { TrafficLightDelay } from './shared/enums/traffic-light-delay.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrafficLightComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  FlexDirection = FlexDirection;
  public trafficLightState: TrafficLightState = TrafficLightState.Green;
  public accidentInProgress: boolean = false;

  ngOnInit() {
    this.startTrafficCycle();
  }

  public startTrafficCycle(): void {
    this.trafficLightState = TrafficLightState.Green;
    this.swapTrafficStateToYellow();
  }

  public swapTrafficStateToYellow(): void {
    if (this.accidentInProgress) {
      return;
    }
    
    const previousState = this.trafficLightState;
    this.trafficLightState = TrafficLightState.Yellow;

    if (previousState === TrafficLightState.Green) {
      setTimeout(() => {
        this.swapTrafficStateToRed();
      }, TrafficLightDelay.Yellow);
    }

    if (previousState === TrafficLightState.Red) {
      setTimeout(() => {
        this.swapTrafficStateToGreen();
      }, TrafficLightDelay.Yellow);
    }
  }

  public swapTrafficStateToGreen(): void {
    if (this.accidentInProgress) {
      return;
    }

    this.trafficLightState = TrafficLightState.Green;
    setTimeout(() => {
      this.swapTrafficStateToYellow();
    }, TrafficLightDelay.Green);
  }

  public swapTrafficStateToRed(): void {
    if (this.accidentInProgress) {
      return;
    }

    this.trafficLightState = TrafficLightState.Red;
    setTimeout(() => {
      this.swapTrafficStateToYellow();
    }, TrafficLightDelay.Red);
  }

  public handleAccident(): void {
    this.accidentInProgress = true;
    this.trafficLightState = TrafficLightState.Yellow;
    setTimeout(() => {
      clearInterval(flashingInterval);
      this.accidentInProgress = false;
      this.startTrafficCycle();
    }, TrafficLightDelay.Off);

    const flashingInterval = setInterval(() => {
      if (this.trafficLightState !== TrafficLightState.Yellow) {
        this.trafficLightState = TrafficLightState.Yellow;
      } else {
        this.trafficLightState = TrafficLightState.Off;
      }
    }, TrafficLightDelay.Flashing);
  }

  public calculateOppositeTrafficLightState(): TrafficLightState {
    switch (this.trafficLightState) {
      case TrafficLightState.Red:
        return TrafficLightState.Green;
      case TrafficLightState.Yellow:
        return TrafficLightState.Yellow;
      case TrafficLightState.Green:
        return TrafficLightState.Red;
      case TrafficLightState.Off:
        return TrafficLightState.Off;
    }
  }
}
