var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/tripplanner', {
	logging: false
});

var Place = db.define('place', {
	address: Sequelize.STRING,
	city: Sequelize.STRING,
	state: Sequelize.STRING,
	phone: Sequelize.STRING,
	location: Sequelize.ARRAY(Sequelize.FLOAT)
})

var Hotel = db.define('hotel', {
	name: Sequelize.STRING,
	num_stars: Sequelize.INTEGER,
	amenities: Sequelize.STRING
})

var Activity = db.define('activity', {
	name: Sequelize.STRING,
	age_range: Sequelize.STRING
})

var Restaurant = db.define('restaurant', {
	name: Sequelize.STRING,
	cuisine: Sequelize.STRING,
	price: Sequelize.INTEGER
})

/*
Place.hasMany(Hotel);
Place.hasMany(Activity);
Place.hasMany(Restaurant);
*/

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
	db: db,
	place: Place,
	hotel: Hotel,
	activity: Activity,
	restaurant: Restaurant
}
