//Вопросы отмечены знаком вопроса(?)
//Правильно понял отмечены реторическим вопросом (?!) - да или не так
//Для удобства встроены цифры после вопросов





class component
{
    constructor(params)
    {
        this.params=params;//Содержит параметры собираемого объекта
        this.component=document.createElement('div');
    }
    /**Видоизменяемый */
    render()
    {
        return `<div></div>`
    }
    /**Вертуальный*/
    beforemount(){}
    mount(place,target)
    {
        this.beforemount();
        this.component.innerHTML=this.render();
        target.insertAdjacentElement(place,this.component);
        this.aftermount();
    }
    /**Вертуальный*/
    aftermount(){}
    /**Вертуальный*/
    beforedestroy(){}
    destroy()
    {
        this.component.remove();
    }
    /**Вертуальный*/
    afterdestroy(){}
}

class Student extends component
{
    constructor(params)
    {
        super(params);
        this.type="student";
        this.img="/"+params.photo;
        this.fullname=params.fullname || (params.lastname)?(params.name+" "+params.lastname):params.name ||params.title|| "no name";
    }

    render()
    {
        return`<div class="card_person">
            <img class="card__img" src="${this.img}">
            <p>Студень ${this.fullname}</p>
        </div>`
    }
}

class Data {
    constructor(/*options*/)
    {
        /*this.options=options;*/
        this.host="http://localhost:8080/api/"//А если localhost поменяется придется ручками менять?    1
    }
    /**
     * 
     * @param {string} query Искомый элемент;
     * @param {???} options 
     * @param {object} params Обьект параметров; {param: value}
     */
    query(query,options,params)//То есть query эт где искать, options не понял, params это искать с какими то параметрами?!     2
    {
        let url=new URL(this.host);
        url.pathname+=query;
        for (let key in params)
            url.searchParams.set(key,params[key]);
        console.log(url);
        return fetch(url).then(response=>{
            console.log("succses");//Для проверки
            ;},(()=>{console.log("error")})
            );//options это действие типо get - получить инфо, put - записать инфо, delete - удалить?   3
            //Я понял .then(действие-успех,действие-ошибка), почему она мне undefined
    }
    //TO DO:
    //create() - устанавливает инфо на сервер
    //delete() - удаляет инфо с сервера

    read(object)
    {
        return this.query(object)
    }
}


const test=new Student({
    name:"Alexsandr",
    lastname: "Navar",
    photo:'img/ava01.jpg'
});
test.mount('beforeend',document.body);
//test.destroy();



let data= new Data();
console.log(data.query('person',{method:'GET'},{id:1}));//тут получаю промис, как не промис? или undefined, что не так?!      4
let stud= new Student(data.query('person',{method:'GET'},{id:1}));//Без понятия что не так но пишет undefenited, пускай запрос уходит и ответ приходит  ??? 5
console.log(stud.params);
stud.mount('beforeend',document.body);