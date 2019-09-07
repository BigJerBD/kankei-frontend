export default class EventBus {
  /**
   * simple wrapper on a Vue used for a bus purpose
   * this handle logs.
   * @param busImpl : bus must implement $emit and $on
   *
   * todo:: make visible payload
   */
  constructor(busImpl) {
    this.bus = busImpl;
  }

  // Adding a method to the constructor
  $emit(channel, message) {
    console.debug(`message sent to ${channel}`);
    // console.debug(`message sent to ${channel} :: ${message}`)
    this.bus.$emit(channel, message);
  }

  $on(channel, func) {
    const catcher = (payload) => {
      // console.debug(`message received from ${channel} :: ${payload}`)
      console.debug(`message received from ${channel}`);
      func(payload);
    };
    this.bus.$on(channel, catcher);
  }
}
