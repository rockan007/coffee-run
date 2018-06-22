(function (window) {
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }
    //添加订单
    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    }
    //删除订单
    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    }
    //打印订单
    Truck.prototype.printOrders = function (printFn) {
        return this.db.getAll()
            .then(function (orders) {
                var customerIdArray = Object.keys(orders);
                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function (id) {
                    console.log(orders[id]);
                    if(printFn){
                        printFn(orders[id]);
                    }
                }.bind(this))
            }.bind(this))
    }
    App.Truck = Truck;
    window.App = App;
})(window)