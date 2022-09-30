const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//=============DATABASE CONNECT+++++++++++++++++++++++

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "todo1",
})
const item2 = new Item({
  name: "todo2",
})
const item3 = new Item({
  name: "todo3",
})

const defaultItems = [item1, item2, item3];

const listSchema = {
  name : String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);
//================GET REQUESTS====================

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err)
          console.log("Error");
        else
          console.log("successful");
      });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

// app.get("/about", function (req, res) {
//   res.render("about");
// });

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
      
        list.save();
        res.redirect("/"+customListName);
      }
   
    else{
      res.render("list",{ listTitle: customListName, newListItems: foundList.items } )
    }
  }
  });
  
});

//==============POST==============================
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });
if (listName ==="Today") {
  item.save();
  res.redirect("/");
}else{
  List.findOne({name: listName}, function(err, foundList) {
    foundList.items.push(item);
    foundList.save();
    res.redirect("/"+listName);
    
  })
}

  
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkBox;
  const listName = req.body.listName;

  if (listName ==="Today") {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (!err) {
        console.log("successful");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    })
  }


  
});

//===============LISTENS to PORT 3000=======================
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
