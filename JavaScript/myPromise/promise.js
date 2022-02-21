function Promise(executor) {
  this.PromiseSate = 'pending'
  this.PromiseResult = null
  this.callback = []
  // console.log(this);
  const self = this

  function resolve(data) {
    // console.log(this);
    if (self.PromiseSate !== 'pending') return
    self.PromiseSate = 'fulfilled'
    self.PromiseResult = data
    if (self.callback.onResolved) {
      self.callback.onResolved(data)
    }
    self.callback.forEach(item => {
      item.onResolved(data)
    });
  }

  function reject(data) {
    if (self.PromiseSate !== 'pending') return
    self.PromiseSate = 'rejected'
    self.PromiseResult = data
    if (self.callback.onRejected) {
      self.callback.onRejected(data)
    }
    self.callback.forEach(item => {
      item.onRejected(data)
    });
  }

  try {
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (this.PromiseSate === 'fulfilled') {
    onResolved(this.PromiseResult)
  }

  if (this.PromiseSate === 'rejected') {
    onRejected(this.PromiseResult)
  }

  if (this.PromiseSate === 'pending') {
    this.callback.push({
      onResolved: onResolved,
      onRejected: onRejected
    })
  }
}

Promise.prototype.catch = function (onRejected) {

}