$(document).ready(() => {
  const menu = new TreeMenu();

  const item1 = menu.addItem('Point 1');
  const item2 = menu.addItem('Point 2');
  item2.addItem('Point 2.1');
  item2.addItem('Point 2.2');
  item2.addItem('Point 2.3');

  const item24 = item2.addItem('Point 2.4');
  item24.addItem('Point 2.4.1');
  item24.addItem('Point 2.4.2');

  const item3 = menu.addItem('Point 3');
  menu.addItem('Point 4');
  menu.addItem('Point 5');

  item1.addItem('Point 1.1');

  const item31 = item3.addItem('Point 3.1');

  const item311 = item31.addItem('Point 3.1.1');
  const item312 = item31.addItem('Point 3.1.2');
  const item313 = item31.addItem('Point 3.1.3');

  item312.addItem('Point 3.1.2.1');
  item312.addItem('Point 3.1.2.2');
  item312.addItem('Point 3.1.2.3');

  const item3124 = item312.addItem('Point 3.1.2.4');
  item3124.addItem('Point 3.1.2.4.1');

  menu.render(); //'.class', '#id'
});

class TreeMenu {
  constructor() {
    this.menu = $(`<div class='tree-menu'></div>`);
    this.children = [];
  }

  addItem(itemTitle) {
    const item = new MenuItem(this, itemTitle);
    this.children.push(item);
    this.menu.append(item.getDOM());

    return item;
  }

  render(container = document.body) {
    this.menu.appendTo(container);
  }
}

class MenuItem {
  constructor(parent, title) {
    this.title = title;
    this.parent = parent; //parent node
    this.children = []; //children nodes

    if (this.parent instanceof TreeMenu) {
      this.left = this.parent.children.length * 120;
      this.top = 0;
    } else if (this.parent instanceof MenuItem) {
      //второй уровень вложенности меню
      if (this.parent.parent instanceof TreeMenu) {
        this.left = 0;
        this.top = (this.parent.children.length + 1) * 50;
      } else {
        this.left = 120;
        this.top = (this.parent.children.length) * 50;
      }
    }

    this.node = this.initDOM(); //current item's DOM
  }

  initDOM() {
    return $(`
      <div class='item' style='top: ${this.top}px; left: ${this.left}px'>
        ${this.title}
      </div>`);
  }

  getDOM() {
    return this.node;
  }

  addItem(itemTitle) {
    const item = new MenuItem(this, itemTitle); //дочерний элемент menuItem
    this.children.push(item);
    this.node.append(item.getDOM());

    return item;
  }
}