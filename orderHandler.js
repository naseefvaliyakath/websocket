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
              fdShopId: data.fdShopId,
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
              var sum = result.fdOrder.map(item => item.price * item.qnt ).reduce((prev, next) => prev + next,0);            
              var newResult = {
                "_id":result._id,
                "error":false,
                "errorCode":"no",
                "totalSize":1,
                "fdOrderStatus":result.fdOrderStatus,
                "fdOrderType":result.fdOrderType,
                "totelPrice":sum,
                "fdOrder":result.fdOrder
                
              }
              
              console.log(newResult)
              io.emit('kitchen_orders_recive', newResult)
            });

          }
          catch (error) {
            throw error
            console.log(error)
          }
      
        })
   
  }