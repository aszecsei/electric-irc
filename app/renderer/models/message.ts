export class Message {
  // TODO: Move this so it's per-server and per-channel
  static Log: Message[] = []

  // TODO: Flesh this out
  msgText: string

  constructor(msgText: string) {
    this.msgText = msgText
  }
}
