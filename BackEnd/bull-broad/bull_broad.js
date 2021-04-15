const Queue = require('bull')
const { setQueues, BullMQAdapter, BullAdapter } = require('bull-board')

const someQueue = new Queue()
const someOtherQueue = new Queue()

setQueues([
  new BullAdapter(someQueue),
  new BullAdapter(someOtherQueue),
]);