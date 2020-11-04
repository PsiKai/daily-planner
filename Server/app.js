const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
app.use(cors());
app.listen(port,() => console.log("Backend started on port " + port));


mongoose.connect("mongodb+srv://admin-david:test123@cluster0-6ghui.mongodb.net/dayplannerDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemsSchema = {
    item: String,
    style: String
  };

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


var date = new Date();
var options = {day: '2-digit', month: 'short', year: 'numeric'};
var resultDate = date.toLocaleDateString("en-GB", options).replace(/,/g, "").replace(/ /g, "-")


app.get("/:newDay", (req, res) => {
    const newDay = req.params.newDay;
    List.findOne({name: newDay}, (err, foundList) => {
        if (!err) {
            if (!foundList) {
                const list = new List ({
                    name: newDay,
                    items: []
                });
            list.save();
            listItems = []
            res.send({list: newDay, items: []})
            } else {
            listItems = foundList.items
            res.send({list: newDay, items: foundList.items})
            }
        }
    })
   
})


app.post("/", (req, res) => {
    const itemName = req.body.item;
    const listName = req.body.list
    console.log(itemName, listName);
    const item = new Item ({
        item: itemName,
        style: ""
    })


     List.findOne({name: listName}, (err, foundList) => {
       if (err) console.log(err);
        console.log(foundList);
       foundList.items.push(item);
        foundList.save();
        res.send({list: listName, items: [...foundList.items]})
        
        })
})

app.post("/delete", (req, res) => {
 
    const crossedItem = req.body.item
    const listName = req.body.list
    const index = req.body.id
    console.log(crossedItem, listName);

    List.findOneAndUpdate({"name": listName, "items.item": crossedItem}, {"$set": {"items.$.style": "strikethrough"}}, (err, success) => {
        if (err) {console.log(err);
        } else {console.log("item updated");}
    })
    res.send({style: "strikethrough", id: index}) 
    // res.end();
})