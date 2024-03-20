const electronRemote = require('@electron/remote')
const NotificationView = require('./notificationView')
const ClickBehavior = require('./behaviors/clickBehavior')
const SwipeRightBehavior = require('./behaviors/swipeRightBehavior')

class Notification {
  constructor (title, options) {
    this.mainWindow = electronRemote?.getCurrentWindow()
    this.view = new NotificationView(title, options)
    this.view.render()
    this.addBehavior(ClickBehavior)
    this.addBehavior(SwipeRightBehavior)
  }

  addBehavior (Klass) {
    const item = new Klass(this.view.element)
    item.on('behavior', (eventName) => {
      this.mainWindow.emit(eventName)
    })
  }
}

module.exports = Notification
