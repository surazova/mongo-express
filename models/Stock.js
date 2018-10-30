const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema ({
    company: {
        type: String, 
        require: true,
    },
    symbol: {
        type: String, 
        require: true,
    },
    times_searched: {
        type: Number,
        require: true,
    },
    current_price: {
        type: Number, 
        require: true, 
    },
    current_price_date: {
        type: Date, 
        default: Date.now,
    },
    volume: {
        type: Number, 
        require: true, 
    },
    highest_cost: {
        type: Number, 
        require: true, 
    },
    eod_price: {
        type: Number, 
        require: true, 
    },
    news_sentiment: { //how many times the stock shows up in news/media (how are people feeling about the stock? happy? sad? tells you how the price changes)
        type: Number, 
        require: true, 
    },
    sales_surprises: {
        type: Date, 
        require: false, 
    },
    growth_history: {
        type: Date, 
        require: false, 
    },
    daily_low: {
        type: Number, 
        require: true, 
    },
})

//symbol attribute (unique field)
//add object id 
//date range: array, not required 
//empty arrays: will be a truthy item (this creates an error)
//make it undefined if it's not provided by the user
//unique: creates it's own key thst is its own item 
//rising and falling (think of a way to use a boolen value) --> on the rise or on the fall 
//boolean value for if a user owns the stock or not 