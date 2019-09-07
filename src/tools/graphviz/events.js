export const CompletionEvent = 'completed';

export class EventController {
  constructor() {
    this.handlers = {
      [CompletionEvent]: [],
    };
  }

  /**
   *
   * @param {string} eventType Type of the event to be handled
   * @param {callback} handler Handler to manage the event
   */
  register(eventType, handler) {
    if (this.handlers[eventType] === undefined) {
      throw new Error(`Unknown event: ${eventType}`);
    }

    this.handlers[eventType].push(handler);
  }

  /**
   *
   * @param {string} eventType Type of the event generated
   * @param {{record_count: *}} values Values associated to the event
   */
  generateEvent(eventType, values) {
    if (this.handlers[eventType] === undefined) {
      throw new Error(`Unknown event: ${eventType}`);
    }
    this.handlers[eventType].forEach((handler) => handler(values));
  }
}
