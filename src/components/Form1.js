import { useState } from "react";
import List from "./List";

// Need to fix so when submitted everything updates
/**
 *
 * @returns form that allows user to input an item name and category
 */

const Form1 = () => {
  // change this method, don't need it to be looking for this value, just set it to empty from the start
  //   const [name, setName] = useLocalStorage("name", "");
  const [name, setName] = useState(() => {
    // getting stored value corresponding with key = name
    const saved = localStorage.getItem("name");
    // parsing out the item grabbed from storage
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  // setCategory state method, need to change like setname
  const [category, setCategory] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("category");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [itemList, setItemList] = useState((list) => {
    const store = window.localStorage;
    let itemList = [];

    for (let i = 0; i < store.length; i++) {
      let parsedItem = JSON.parse(store.getItem(store.key(i)));
      itemList.push(parsedItem);
    }
    return itemList;
  });

  // check how many entries are in localStorage since it doesn't have a built in function for this -__-
  const howManyInStorage = () => {
    let store = window.localStorage;
    let count = 0;
    for (let i = 0; i < store.length; i++) {
      count++;
    }
    return count;
  };

  // when submit is clicked
  const itemSubmitHandler = (e) => {
    // empty item to be filled and submitted
    let itemToSubmit = { name: "", category: "" };
    // // get localstorage
    // let storage = window.localStorage;
    // // create keys for everything
    // let key = howManyInStorage() + 1;
    // prevent reload
    e.preventDefault();
    // if the field isn't empty, put them into the item the empty object and then into localStorage
    if (e.target[0].value) {
      itemToSubmit.name = e.target[0].value;
      itemToSubmit.category = e.target[1].value;
      //   storage.setItem(key, JSON.stringify(itemToSubmit));
      setItemList([...itemList], itemToSubmit);
      console.log(itemList);
      // }
    }
  };

  return (
    <>
      <form onSubmit={itemSubmitHandler}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item"
          aria-label="item"
        />
        <input
          type="text"
          value={category}
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          aria-label="category"
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      <List list={itemList} />
    </>
  );
};

export default Form1;
