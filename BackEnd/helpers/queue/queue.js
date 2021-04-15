
const Queue = require('bull')
const { setQueues, BullAdapter } = require('bull-board')
// const procedure = require("../../database/query/db.query")
const queue_config = require("../../configs/queque.config")
const createQueue = (nameQueue) => {
  return new Queue(nameQueue, { 
    max:queue_config.limiter.max
   })
}
const addElementToQueue = (nameQueue, obj) => {
  Queue(nameQueue).add(obj, {
    delay:queue_config.jobOpts.delay
  })
}
const processQueue = (nameQueue, store) => {
  Queue(nameQueue).process(async (job, jobDone) => {
    // const values = compareEntries(job.data);
    // await procedure.sproc(store, values);
    job.progress(100);
    jobDone()
    console.log("a");
  })
}
const compareEntries = (obj) => {
  const arr = []
  Object.entries(obj).map(([key, value]) => {
    arr.push(value)
  })
  return arr;
}

const setQueue = (nameQueue) => {
  setQueues([
    new BullAdapter(createQueue(nameQueue), { readOnlyMode: false }),
  ])

}
module.exports = {
  setQueues, BullAdapter,
  addElementToQueue,
  processQueue,
  setQueue
}
