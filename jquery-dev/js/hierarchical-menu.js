class MenuNode {
  constructor() {
    this.children = []; //children nodes

    this.node = this.initDOM(); //current item's DOM
  }

  initDOM() {
    return null;
  }

  getDOM() {
    return this.node;
  }

  createItem(itemTitle) {
    const item = new MenuItem(this, itemTitle);
    this.children.push(item);
    this.node.append(item.getDOM());

    return item;
  }
}

class RootItem extends MenuNode {
  initDOM() {
    return $(`<div class='tree-menu'></div>`);
  }
}

class MenuItem extends MenuNode {
  constructor(parent, title) {
    super();

    this.parent = parent;
    this.title = title;
    this.display = 'inline-block';

    const length = this.parent.children.length;

    if (this.parent instanceof RootItem) {
      this.left = length * 120;
      this.top = 0;
    } else if (this.parent instanceof MenuItem) {
      this.display = 'none'; //видны только элементы первого уровня
      //второй уровень вложенности меню
      if (this.parent.parent instanceof RootItem) {
        this.left = 0;
        this.top = (length + 1) * 50;
      } else {
        this.left = 120;
        this.top = (length) * 50;
      }
    }

    this.node = this.initDOM();

    this.node.click((event) => {
      event.stopPropagation();

      this.children.forEach(child => {
        child.node.fadeToggle();
      });
      //console.log(this.title, this.children);
    });
    //подписка на события
  }

  initDOM() {
    return $(`
      <div class='item' style='top: ${this.top}px; left: ${this.left}px; display: ${this.display}'>
        ${this.title}
      </div>`);
  }
}

class TreeMenu {
  constructor() {
    this.menu = new RootItem();
  }

  render(container = document.body) {
    this.menu.getDOM().appendTo(container);
  }

  createItem(title) {
   return this.menu.createItem(title);
  }
}

