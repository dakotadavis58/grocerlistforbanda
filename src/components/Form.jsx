import React from "react";
import List from "./List";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAmount: 0,
      itemName: "",
      itemCategory: "",
      itemList: this.initializeItemList(),
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleDoneWithListSubmit = this.handleDoneWithListSubmit.bind(this);
  }

  // initiate starting values of item list
  initializeItemList = () => {
    // get local storage object
    const store = window.localStorage;
    // create empty array
    let itemList = [];
    // for each item in storage...
    for (let i = 0; i < store.length; i++) {
      // parse it out..
      let parsedItem = JSON.parse(store.getItem(store.key(i)));
      // push it into the list, then return
      itemList.push(parsedItem);
    }
    return itemList;
  };

  // finds how many items are currently in localStorage
  howManyInStorage = () => {
    let store = window.localStorage;
    let count = 0;
    for (let i = 0; i < store.length; i++) {
      count++;
    }
    return count;
  };

  itemSubmitHandler = (e) => {
    // empty item to be filled and submitted
    let itemToSubmit = { name: "", category: "", amount: 0 };
    let itemList = [...this.state.itemList];
    // get localstorage
    let storage = window.localStorage;
    // create keys for everything
    let key = this.howManyInStorage() + 1;
    // prevent reload
    e.preventDefault();
    // if "item" isnt empty, we get the value and category, set the properties of the empty object
    // then push it into the itemList, then set the item into storage
    if (e.target[0].value) {
      itemToSubmit.name = e.target[0].value;
      itemToSubmit.category = e.target[1].value;
      itemToSubmit.amount = e.target[2].value;
      itemList.push(itemToSubmit);
      storage.setItem(key, JSON.stringify(itemToSubmit));
    }
    this.setState({
      itemName: "",
      itemCategory: "",
      itemAmount: 0,
      itemList: itemList,
    });
  };

  handleItemChange(e) {
    this.setState({ itemName: e.target.value.toLowerCase() });
  }

  handleCategoryChange(e) {
    this.setState({ itemCategory: e.target.value.toLowerCase() });
  }

  handleAmountChange(e) {
    if (e.target.value >= 0) this.setState({ itemAmount: e.target.value });
  }

  handleDoneWithListSubmit(e) {
    e.preventDefault();
    this.createListWindow();
  }

  createListWindow() {
    let list = this.state.itemList;
    let newWindow = window.open(
      "",
      "Test",
      "width=800,height=800,scrollbars=1,resizable=1"
    );
    let beginHtml = "<html><head></head><body>";
    let endHtml = "</body></html>";
    list = this.sortByCategory(list);
    beginHtml += this.addItemsToHTMLString(list);
    beginHtml += endHtml;
    newWindow.document.open();
    newWindow.document.write(beginHtml);
    newWindow.document.close();
  }

  addItemsToHTMLString(list) {
    let itemHtml = "";
    for (let i = 0; i < list.length; i++) {
      if (i === 0 || list[i].category !== list[i - 1].category) {
        itemHtml += `<h3>${list[i].category.toUpperCase()}</h3>`;
      }
      itemHtml += `<div>${list[i].amount} x ${list[i].name}</div>`;
    }
    return itemHtml;
  }

  sortByCategory(list) {
    let categorySet = new Set();
    let sortedArray = [];
    for (let i = 0; i < list.length; i++) {
      categorySet.add(list[i].category);
    }
    const iterator = categorySet.values();
    for (let i = 0; i < categorySet.size; i++) {
      let categoryToCheck = iterator.next().value;
      for (let j = 0; j < list.length; j++) {
        console.log(list[j].category, categoryToCheck);
        if (list[j].category === categoryToCheck) {
          sortedArray.push(list[j]);
          console.log(sortedArray);
        }
      }
    }
    return sortedArray;
  }

  render() {
    return (
      <>
        <div className="row text-center">
          <form onSubmit={this.itemSubmitHandler}>
            <input
              className="col-sm-2 border-2 m-1"
              type="text"
              value={this.state.itemName}
              onChange={this.handleItemChange}
              placeholder="Item"
              aria-label="item"
            />
            <input
              className="col-sm-2 border-2 m-1"
              type="text"
              value={this.state.itemCategory}
              placeholder="Category"
              onChange={this.handleCategoryChange}
              aria-label="category"
            ></input>
            <input
              className="col-sm-1 border-2 m-1"
              type="number"
              value={this.state.itemAmount}
              placeholder="Amount"
              onChange={this.handleAmountChange}
              aria-label="amount"
            ></input>
            <input className="btn" type="submit" value="Submit"></input>
          </form>
          <form onSubmit={this.handleDoneWithListSubmit}>
            <input className="btn" type="submit" value="Done with list" />
          </form>
        </div>
        <List list={this.state.itemList} />
      </>
    );
  }
}

export default Form;
