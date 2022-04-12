const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    loves: [String]
});

const unicornModel = mongoose.model("unicorns", unicornSchema);


app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err);
})

app.use(bodyparser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://juan:Rocco123@cluster0.nxfhi.mongodb.net/A3?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Instead of defining each static route, we can define a public folder that contains the static files we need
app.use(express.static("public"));

app.post("/findByName", function (req, res) {
    unicornModel.find({
        name: req.body.unicornName
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        }
        res.send(unicorns);
    });
})

app.post("/findByFood", function (req, res) {
    let listOfFoods = []
    if (req.body.appleIsChecked === "true") {
        listOfFoods.push("apple");
    }
    if (req.body.carrotIsChecked === "true") {
        listOfFoods.push("carrot");
    }
    unicornModel.find({
        loves: {
            $in: listOfFoods
        }
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        }
        res.send(unicorns);
    });
})

app.post("/findByWeight", function (req, res) {
    let lowerLimit = parseInt(req.body.lowerLimit);
    let upperLimit = parseInt(req.body.upperLimit);
    // If there are no limits (these values are NaN if nothing was inputted), then change them to default values (no limit)
    if (!lowerLimit) lowerLimit = 0;
    if (!upperLimit) upperLimit = Infinity;
    unicornModel.find({
        weight: {
            $gt: lowerLimit,
            $lt: upperLimit
        }
    }, function (err, unicorns) {
        if (err) {
            console.log("Error " + err);
        }
        res.send(unicorns);
    });
})