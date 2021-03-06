class MenuNode {
  //вынести parent сюда
  constructor(parent) {
    this.parent = parent;
    this.children = []; //children nodes
    this.node = this.initDOM(); //current item's DOM
    this.id = '';
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

    //обернуть здесь
    this.node.append(item.getDOM());

    return item;
  }
}

class RootItem extends MenuNode {
  constructor(parent) {
    super(parent);
  }

  initDOM() {
    return $(`<div class='tree-menu'></div>`);
  }
}

class MenuItem extends MenuNode {
  constructor(parent, title) {
    super(parent);

    this.title = title;
    this.display = 'inline-block';

    const length = this.parent.children.length;
    const width = 120;
    const height = 50;

    this.id = this.parent.id + length.toString();

    if (this.parent instanceof RootItem) {
      this.left = length * width;
      this.top = 0;
    } else if (this.parent instanceof MenuItem) {
      this.display = 'none'; //видны только элементы первого уровня
      //второй уровень вложенности меню
      if (this.parent.parent instanceof RootItem) {
        this.left = 0;
        this.top = (length + 1) * height;
      } else {
        this.left = width;
        this.top = (length) * height;
      }
    }

    this.node = this.initDOM();

    this.node.mouseenter((event) => {
      event.stopPropagation();

      //закрыть все открытые до этого узлы
      this.node.children().fadeIn();
    });

    this.node.mouseleave((event) => {
      event.stopPropagation();

      const { relatedTarget } = event;

      const prevUid = this.id;
      const nextUid = $(relatedTarget).attr('uid');

      //console.log(prevUid, nextUid);

      if (nextUid && nextUid.startsWith(prevUid)) {
        return;
      } else if (nextUid) {
        this.node.children().fadeOut();
      }
    });
  }

  initDOM() {
    return $(`
      <div class='item' uid='${this.id}' style='top: ${this.top}px; left: ${this.left}px; display: ${this.display}'>
        ${this.title}
      </div>`);
  }
}

class TreeMenu {
  constructor() {
    this.menu = new RootItem(this);
  }

  render(container = document.body) {
    this.menu.getDOM().appendTo(container);
  }

  createItem(title) {
   return this.menu.createItem(title);
  }

  close() {
    this.menu.children.forEach((child) => {
      child.node.children().fadeOut()
    });
  }
}

