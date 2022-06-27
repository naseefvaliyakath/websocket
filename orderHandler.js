const orders = require('./model/orders');

module.exports = (io, socket) => {
   
        console.log('connected success fully' + socket.id)
      
          //load data from mongodB
          try {
            orders.find((err, result) => {
              if (err) {
                console.log(err)
                return
              }
              io.emit('message-recive', result)
              //console.log(result)
            });
            
          } catch (error) {
            throw error
          }
      
        socket.on('disconnect', () => {
          console.log('disconnected')
        })
      //recive orders
        socket.on('kitchen_orders', async (data,callback) => {
          console.log(data.fdOrder)
          console.log(socket.id)
          //add in db and send to user
          try {
            const mongoData = new orders({
              fdOrder: data.fdOrder,
              fdOrderStatus: data.fdOrderStatus,
              fdOrderType: data.fdOrderType,
            })
            mongoData.save((err, result) => {
              if (err) {
                callback('error')
                console.log(err.message)
                return
              }
              callback('success')
              io.emit('message-recive', data)
              //console.log(result)
            });
      
          }
          catch (error) {
            
            throw error
          }
      
        })
   
  }