import type { ResourceId } from '../../resource/resource-definition';
import type { Message } from '../message';

export interface ResourceDepleteRequest extends Message {
  id: ResourceId;
}
