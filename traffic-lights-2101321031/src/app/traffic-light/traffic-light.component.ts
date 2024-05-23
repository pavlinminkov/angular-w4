import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlexDirection } from '../shared/enums/flex-direction.enum';
import { TrafficLightState } from '../shared/enums/traffic-light-state.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-traffic-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traffic-light.component.html',
  styleUrl: './traffic-light.component.css',
})
export class TrafficLightComponent {
  @Input()
  public inputFlexDirection: FlexDirection = FlexDirection.Row;
  @Input()
  public inputTraficLightState: TrafficLightState = TrafficLightState.Red;

  @Output()
  public onCross = new EventEmitter<TrafficLightState>();

  public TrafficLightState = TrafficLightState;

  public handleCrossButton() {
    this.onCross.emit(this.inputTraficLightState);
  }
}
