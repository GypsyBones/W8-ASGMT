

class Item {
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}


/*
I wanted both a general name and a description, I like to view exactly what the to do item is about before describing what I need to do with it
*/


class List {
    constructor(date, item) { 
        this.date = date;
        this.item = item; 
        this.list = []; //sort function didn't work here?
    }
    
    describe(){
        return `You have ${this.list.length} items to do by this date.`;
    }
}


/*
utilizing a date as the header for the list, the item is what makes up the list, which is then accorded by an array called this.list. 
this describe function is called in later
*/


class Menu {
    constructor() {
        this.selectedList = null; //is null so it can be accorded later
        this.lists = []; // where the array for the list of lists is located
    }

    start() {
        let selection = this.showMainMenuOptions(); //the first menu to pop up, and the menu that the code returns to 
        while (selection != 0) {
            switch (selection) {
                case '1': 
                    this.createList(); //brings up the function of creating a list
                    break;
                case '2':
                    this.viewList(); 
                    break;
                case '3':
                    this.deleteList();
                    break;
                case '4':
                    this.displayLists();
                    break;
                default:
                    selection = 0; // if a wrong selection is made, it defaults back to the main menu
            }
            selection = this.showMainMenuOptions(); 
        }
        alert('Goodbye!'); // this is what happens when the selection does equal 0
    }
     
    showMainMenuOptions() { //this is the face of the optionality that is coded up within the function that this is called in
        return prompt(`
        0) exit
        1) create new List
        2) view List
        3) delete List
        4) display all lists
        `);
    }
    
    
    showListMenuOptions(listInfo) {
    return prompt (`
        0) back
        1) create item
        2) delete item
        ------------------
        ${listInfo}
        `);
    }

    createList() {
        let date = prompt(`Enter Due Date for Item:`); //the prompt creates the date
        this.lists.push(new List(date)); // the list is then pushed through to the lists array using the date as the name of the list
    }

    viewList() {
        let index = prompt('Enter the index of the List you wish to view'); //asks for the index of which determines which list will show
        if (index > -1 && index < this.lists.length) {
            this.selectedList = this.lists[index]; //this determines what the selected list is, based on the index of the loop through the array
            let description = this.selectedList.date + ': ' + this.selectedList.describe() + '\n'; //the date of the selected list with the describe function called out from the earlier List class

            for (let i = 0; i <this.selectedList.list.length; ++i) {
                description += i + ') ' + this.selectedList.list[i].name + ' - ' + this.selectedList.list[i].description + '\n';
            }
            let selection = this.showListMenuOptions(description); //shows the list menu function from above
            switch (selection) { // the coded functionality of the menu options above
                case '1':
                    this.createItem(); //calls the function from below
                    break;
                case '2':
                    this.deleteItem();
                    break;
            }
        }
    }

    createItem () { // two prompts that create the name and escription, which are then pushed as an Item class, to the List array
        let name = prompt(`Enter name of new To Do Item:`);
        let description = prompt(`Enter description of To Do Item:`);
        this.selectedList.list.push(new Item(name, description));
        this.viewList(); //calls the view list function, couldn't figure out how to do so with the current list 
    }
        
    deleteItem () { //prompts an index for deletion 
        let index = prompt('Enter the index of the player that you wish to delete:');
        if (index > -1 && index < this.selectedList.list.length) {
            this.selectedList.list.splice(index, 1);
        }
        this.viewList();
    }

    displayLists() { //display all the lists
        let listString = ''; // introduces an empty variable that is called later
        let sortedList = this.lists.slice().sort((a, b) => a - b); //could NOT for the life of me get this Array SORTED
        for (let i = 0; i < sortedList.length; i++) { //despite the array not SORTING through the sortedList, it still functions here??
            listString += i + ') ' + this.lists[i].date + '\n'; // the iterations of the lists 
        }
        alert(listString); // the visual of the lists being show
    }

    deleteList() {
        let index = prompt('Enter the index of the list that you wish to delete:')
        if (index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1) //deletes a list through splicing, which takes the prompted index and removes the 1 list
        }
    }

}

let menu = new Menu()
menu.start();


/*
This was in case I figured out how to include Date constructor, decided it was too much atm to figure out
let options = {
  "yyyy-mm-dd": "[[date|%Y-%m-%d]]",
  "Month d, yyyy": "[[date|%B %e, %Y]]",
  "mm/dd/yyyy": "[[date|%m/%d/%Y]]",
  "mm-dd-yyyy": "[[date|%m-%d-%Y]]",
  "mm/d/yy": "[[date|%m/%e/%y]]",
  "mm-d-yy": "[[date|%m-%e-%y]]"
}
*/

