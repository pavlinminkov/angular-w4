import { Component, Input } from '@angular/core';
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
  public flexDirection: FlexDirection = FlexDirection.Row;
  @Input()
  public traficLightState: TrafficLightState = TrafficLightState.Red;

  TrafficLightState = TrafficLightState;
}
