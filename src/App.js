import React from 'react';
//import logo from './logo.svg';
import './App.css';
//<img src={logo} className="App-logo" alt="logo" />


//'use strict';


class Component {
    constructor(options) {
        this.options = options;
		this.state = {};
		this.container = undefined;
		
		// для сбора подписок на события и автоматической отписки
        this.handlers = {};
    }


    /**
     * помещает верстку компонента в dom
     * @param {DOMElement} container контейнер в котором строиться верстка, куда поместить
     * @param {String} position insertAdjacentElement позиция куда помесить, до, в, вконец, после
     */
    /*mount(container, position) {
        // прехук до монтирования        
        this.beforeMount();
		
        // создаем новый компонент в доме
        const newComponent = document.createElement('div');
		
        // помещаем туда верстку
        newComponent.innerHTML = this.toString();
		
		this.container = newComponent.firstElementChild;
		
        // перекладываем верстку в нужный контейнер
        container.insertAdjacentElement(position || 'beforeend', newComponent.firstElementChild);
		
        // подчищаем за собой
        newComponent.remove();
		
        // прехук после монтирования
        this.afterMount()
    }*/

    /**
     * вызываеться при необходимости обновить компонент в верстке
     */
    update() { }

    /**
     * Уничтожения компонента из dom и вообще
     */
    unmount() {
        // выполняем прехуки
        this.beforeUnmount();
		
        // уничтожаем собственный контейнер
        this.removeContainer()

        // прехук после уничтожения
        this.afterUnmount();
    }

    // прехук до монтирования
    beforeMount() {}

    // прехук после монтирования
    afterMount() {}

    // прехук до размонтирования
    beforeUnmount() {}

    // прехук после размонтирования
    afterUnmount() {}

    // получение контейнера из дома куда смонтирован компонент
    getContainer() {
        if (this.container === undefined) {
            this.container = document.getElementById(this.id);
        }
        return this.container;
    }
	
	// уничтожаем собственный контейнер
	removeContainer() {
		if (this.container) {
			this.container.remove();
			this.container = undefined;
		}
    }

    // view компонента, обязательно должен содержать контейнер!!!
    render() {
        return `<div></div>`;
    }

    // текстовое представление компонента, по сути его рендер
    toString() {
        return this.render(this.options, this.state);
    }
	
	// observer
	// прдписка любого компонента или его части на событие для его автоматической отписки при уничтожении исходного компонента
    subscribeTo(target, eventName, handler) {
        const handlers = this.handlers[eventName] || [];
        // положим источник и обработчик в список события
        handlers.push({
            target,
            handler
        });
        this.handlers[eventName] = handlers;
        // подпишимся
        target.addEventListener(eventName, handler);
    }

    // отписаться от всех событий
    unsubscribeAll() {
        for (let eventName in this.handlers) {
            this.unsubscribeByEvent(eventName);
        }
    }

    // отписать всех от определенного события
    unsubscribeByEvent(eventName) {
        this.handlers[eventName].forEach(element => {
            element.target.removeEventListener(eventName, element.handler);
        });
    }
}

class Header extends React.Component {
    render() {
        return <div>
        
            <div className="card card_header">
                <img className="card__img" src="img/logo.jpg" alt={this.options.title} />
                <p className="card__title" title={this.options.title}>{this.options.title}</p>
                <span className="card__description" title={this.options.description}>{this.options.description}</span>
            </div>
        </div>;
    }
}

/**
 * компонент персоны
 */
class Person extends React.Component {
    constructor(item) {
        super();
        this.state.item = item;
    }

    render() {
        return <div className="card card_person">
            <img className="card__img card__img_round" src={this.state.item.photo || 'img/ui/default_pix.jpg'} alt="Аватар {this.state.item.title}" />
            <p className="card__title" title={this.state.item.title || ''}>{this.state.item.title || ''}</p>
            <span className="card__description" title={this.state.item.study || ''}>{this.state.item.study || ''}</span>
        </div>;
    }

    afterMount() {
        this.subscribeTo(this.getContainer(), 'click', this.onClick.bind(this));
    }

    onClick() {
        this.openPersonPopup(this.state.item);
    }

    openPersonPopup(item) {
        if (this.openPopupAction === undefined) {
            this.openPopupAction = factory.create(OpenPopupAction);
        }
        this.openPopupAction.execute({
            caption:  `${item.title}`,
            target: this.getContainer(),
            content: `<center><img height="300" width="300" class="card__img" src="${item.photo || 'img/ui/default_pix.jpg'}" alt="Аватар ${item.title}" /></center>`,
            offset: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        });
    }
}


/**
 * Компонент окошка
 */
class Popup extends Component {
    render({caption, content, contentComponent}) {
        return <div className="popup">
            <div className="popup__header">
                <p className="popup__title" title={caption}>{caption}</p>
                <img className="popup__closeButton" title="Закрыть" alt="Кнопка закрыть" src="img/ui/close_x.png"/>
            </div>
            <div className="popup__content">
            {content}
            </div>
        </div>;
    }

    afterMount() {
        this._closeButton = this.getContainer().querySelector('.popup__closeButton');
        this.subscribeTo(this._closeButton, 'click', this.onClose.bind(this));
        this.setPopupPosition();
    }

    beforeUnmount() {
        delete this._closeButton;
    }

    onClose() {
        this.close();
    }

    close() {
        this.unmount();
    }


    /**
     * Позиционирует Popup окно
     * @param {Element} popup dom элемент popup 
     * @param {Element} target dom элемент для позиционирования
     * @param {Object} offset объект настроек размера popup
     */
    setPopupPosition() {
        const container = this.getContainer();
        const offset = this.options.offset;

        // выставляем значения по умолчанию для получения реальных размеров в доме
        container.style.left = offset.left + 'px';
        container.style.top = offset.top + 'px';
        
        // получаем реальные размеры элементов окна и таргета и вычисляем куда позиционировать popup
        let position = this.coutPopupPosition(this.options.target.getBoundingClientRect(), container.getBoundingClientRect());
        container.style.left = position.left + 'px';
        container.style.top = position.top + 'px';
    }

    /**
     * Вычисление положения popup
     * @param {Object} target - объект размеров и положения относительного элемента 
     * @param {Object} offset - объект размеров и положения popup
     * @returns  {left, top} - смещение окна
     */
    coutPopupPosition(target, offset) {
        let {width=0, height=0, left=0, top=0} = offset || {};
        let {left:tleft=0, top:ttop=0} = target || {};

        // получаем размер окна браузера
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        const defOffset = 8; // смещение чтоб не липло к краям

        if (left + width === innerWidth) {
            tleft = 0;
        }

        // берем левый верхний угол таргета и смещение для popup если надо
        left = tleft + left;
        top = ttop - top;

        // проверяем влезает ли в окно браузера, если нет, корректируем смещение
        if (tleft + width > innerWidth) {
            left = left + (innerWidth - (width + tleft)) - defOffset;
        }

        if (ttop + height >= innerHeight) {
            top = top + (innerHeight - (ttop + height)) - defOffset;
        }

        return {left, top};
    }
}

/**
 * компонент стека окошек
 */
class PopupStack extends Component {
	constructor(options) {
		super(options);
		this.popups = [];
	}
	
    render() {
        return <div className="popup-stack"></div>;
    }

    clear() {
		this.popups.forEach( p => {
			p.unmount();
		});
    }

    append(options) {
		const popup = factory.create(Popup, options);
		this.popups.push(popup);
		popup.mount(this.getContainer());
    }
}

/**
 * Команда — это поведенческий паттерн проектирования, который превращает запросы в объекты, позволяя передавать их как аргументы при вызове методов, ставить запросы в очередь, 
 * логировать их, а также поддерживать отмену операций.
 */

class Action {
    execute(meta) {
        throw new Error('Необходима реализация');
    }
}

class OpenPopupAction extends Action {
    execute(meta) {
        popupStack.clear();
        popupStack.append(meta);
    }
}

/**
 * Абстрактная фабрика для создания контролов
 */
class ComponentFactory {
    create(component, options) {
        return new component(options || {});
    }
}

const factory = new ComponentFactory();

const head = factory.create(Header, {
    title: 'Tensor Scool',
    description: 'Это страница школы Тензор. Тут вы можете познакомиться с нашими учениками и посмотреть темы занятий.'  
});
//head.mount(document.body);

const person = factory.create(Person, {
	item: {
		title: 'Женя Серова',
		photo: 'img/ava03.jpg',
		study: 'Угату',
		bday: new Date('1998-11-13'),
		phone: '+7 (963) 123-45-67',
		active: new Date('2020-04-03T20:00:00')
	}
});
//person.mount(document.body);


const popupStack = factory.create(PopupStack);
//popupStack.mount(document.body);

/*class DataSet{
    constructor(options){
        this.options = {
            host: 'http://localhost:8080/api/',
            object: options.object
        }
    }

    query(query, options, params){
        let url = new URL(this.options.host);
        url.pathname += query;
        for (let k in params){
            url.searchParams.set(k, params[k]);
        }

        return fetch(url, options)
        .then( response =>  response.json() );
    }

    list(){
        return this.query(
            `${this.options.object}`,
            {
                method: 'GET'
            },
            {
                '_page': page,
                '_limit': limit
            });

    }

    read(id){
        return this.query(
            `${this.options.object}/${id}`,
            {
                method: 'GET'
            });
    }

    create(data){
        return this.query(
            `${this.options.object}`,
            {
                method: 'POST',
                body: data
            });
    }

    delete(id){
        return this.query(
            `${this.options.object}`,
            {
                method: 'DELETE',
            });
    }

    update(id, data){
        return this.query(
            `${this.options.object}/${id}`,
            {
                method: 'PATCH',
                body: data
            });

    }

}

let dataset = new DataSet({
    object: 'person'
});

dataset.read(1).then( result => { console.log(result) } );*/
//Так и не вышло отправить запрос я пытался и внести mount внутри .then, но в новой верстке это вовсе не робит даже локально

function App() {
  return (
      person.render() 
  );
}
//mount получился не нужен, но остается вопрос как заставить после вставления через App работать before/after mount
//Долго мучал вышло прилепить только person, я пытался его совместить с head.render() там тоде объект типа React но при сумме + он выдает [Object][Object] 
//Пытался через <Header /> но тогда я не могу параметры передать в .this.state.item
//Подключить получилось через npx для Node.js v12.16.2
//Команда npx create-react-app my-app
//npx start на хосте 3000

export default App;