//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");  we delete our date and use a simpler formate
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

const itemsSchema = { //where itemsSchema is the schema name
    name: String //the we put the field name plus it s data type which is a string
        // our schema
};


// them we create a model here 
const Item = mongoose.model("Item", itemsSchema) // here we create  our model where item is the name of the  model
    // and the inside the (we put our item in a singular format with another parameter using our schema)
    //and we add our collection
    // always capitalize ur mongoose model



// here we create our items
const item1 = new Item({
    name: "Welcome to your todolist!"
})
const item2 = new Item({
    name: "Hit the + button to add a new item."
})
const item3 = new Item({
    name: "<-- Hit this to delete an item."
})




const defaultItems = [item1, item2, item3]; // we create a default items array







app.get("/", function(req, res) {

    // const day = date.getDate(); we delete our date


    Item.find({}, function(err, foundItems) {

        if (foundItems.length === 0) {

            Item.insertMany(defaultItems, function(err) { //modelname.insertmany(documentArray, fumction(err){//deal with error or log success})
                if (err) {
                    console.log(err)

                } else {
                    console.log("Successfully saved default items to  DB.")
                }
            })
            res.redirect

        } else {




            res.render("list", { listTitle: "Today", newListItems: foundItems });
            // console.log(foundItems)


        }
    })



});

app.post("/", function(req, res) {

    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
    item.save(); // save our item into our collection

    res.redirect("/"); // redirect to our home route
    // if (req.body.list === "Work") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // } else {
    //     items.push(item);
    //     res.redirect("/");
    // }
});
app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, function(err) {
        if (!err) {
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }
    })


})
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});