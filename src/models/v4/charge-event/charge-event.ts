import type { Charge } from '../charge/charge';
import type { EventData } from '../event/event-data';

export interface ChargeEvent extends EventData {
  charge: Charge;
}
