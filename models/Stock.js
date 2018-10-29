const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema ({
    company: {
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
    news_sentiment: { //how many times the stock shows up in news/media 
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