/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class NotificationEmitter<T, K extends string> {
  protected eventEmitter: EventEmitter2;
  constructor(eventEmitter: EventEmitter2) {
    this.eventEmitter = eventEmitter;
  }

  abstract emitEvent(eventName: K, eventClass: T): void;
}
