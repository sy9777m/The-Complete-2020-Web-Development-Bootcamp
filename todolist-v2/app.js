//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-siyun:test123@cluster0-m8iy3.azure.mongodb.net/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const itemsSchema = {
  name: String
};

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Coding'
});

const item2 = new Item({
  name: 'Work'
});

const item3 = new Item({
  name: 'Exercise'
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model('List', listSchema);

app.get("/", function(req, res) {

  Item.find({}, function (err, result) {
    if(err) {
      console.log(err);
    } else {

      if(result.length === 0) {
        Item.insertMany(defaultItems, function (err) {
          if(err) {
            console.log(err);
          } else {
            console.log('successfully added to DB.');
          }
        });
        res.redirect('/');
      } else {
        res.render("list", {listTitle: 'Today', newListItems: result});
      }
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = _.lowerCase(req.body.list);

  const itemDocument = new Item({
    name: itemName
  });

  if (listName === 'today') {
    itemDocument.save();

    res.redirect('/');
  } else {

    List.findOne({name: listName}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        result.items.push(itemDocument);
        result.save();
        res.redirect('/' + listName);
      }
    });
  }
});

app.post('/delete', function (req, res) {

  const itemID = req.body.itemCheckbox;
  const listName = _.lowerCase(req.body.listName);

  if (listName === 'today') {
    Item.findByIdAndRemove(itemID, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemID}}}, function (err, result) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/' + listName);
      }

    })
  }

})

app.get('/:type', function (req, res) {

  const type = _.lowerCase(req.params.type);

  List.findOne({name: type}, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      if(!result) {
        const list = new List({
          name: type,
          items: defaultItems
        });

        list.save();
        res.redirect('/' + type);
      } else {
        res.render("list", {listTitle: _.capitalize(result.name), newListItems: result.items});
      }
    }
  })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
