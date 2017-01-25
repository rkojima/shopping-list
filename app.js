//make new box for each new item added
//add name of item into new box
//add check and delete to new items 
//add classes accordingly
//add "shopping-item_checked" to checked items
//remove items if deleted

/*should render:
    <li>
        <span class="shopping-item">ITEM_RIGHT_HERE</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
    </li>
*/

//how to add checked items? 
//Add into DOM directly or add into new object? Do I need to keep track of checked items?

'use strict'

var state = {
    allItems: ['apples', 'oranges', 'milk', 'bread'],
    checkedItems: ['milk']
};


function addItem(state, item) {
    if (!state.allItems.includes(item)) {
        state.allItems.push(item);
    }
}

function deleteItem(state, item) {
    var index = 0;
    if (state.allItems.includes(item)) {
        index = state.allItems.indexOf(item);
        if (index > -1) {
            state.allItems.splice(index, 1);
        }
        index = state.checkedItems.indexOf(item);
        //console.log(index);
        if (index > -1) {
            state.checkedItems.splice(index, 1);
        }
    }
}

function checkItem(state, item) {
    var index = 0;
    if (state.allItems.includes(item)) {
        if (state.checkedItems.includes(item)) {
            index = state.checkedItems.indexOf(item);
            if (index > -1) {
                state.checkedItems.splice(index, 1);
            }
        } 
        else if (!state.checkedItems.includes(item)) {
            state.checkedItems.push(item);
        }
    }
}

function renderItems(state, element) { //element would probably be list
    var itemsHTML = state.allItems.map(function(item) {
        return renderItem(state, item);
    })
    element.html(itemsHTML); 
}

function renderItem(state, item) {
    var html = $('<li>' + '<span class="shopping-item">' + item + 
        '</span>' + '<div class="shopping-item-controls">' + 
        '<button class="shopping-item-toggle">' + 
        '<span class="button-label">check</span>' + '</button>' + 
        '<button class="shopping-item-delete">' + 
        '<span class="button-label">delete</span>' + 
        '</button></div></li>');
    if(state.checkedItems.includes(item)) {
        html.find('.shopping-item').addClass('shopping-item__checked');
    }
    return  html;
}

//add 
$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        console.log($('#shopping-list-entry').val());
        addItem(state, $('#shopping-list-entry').val());
        renderItems(state, $('ul'));
    })
    $('ul').on('click', '.shopping-item-toggle', function(event) {
        event.preventDefault();
        //console.log($(this).parent().siblings('span').text());
        var toToggle = $(this).parent().siblings('span').text();
        checkItem(state, toToggle);
        //console.log(state);
        renderItems(state, $('ul'));
    })
    $('ul').on('click', '.shopping-item-delete', function(event) {
        event.preventDefault();
        var toDelete = $(this).parent().siblings('span').text()
        deleteItem(state, toDelete);
        renderItems(state, $('ul'));
    })
})
