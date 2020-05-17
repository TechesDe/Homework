import {Student, Teacher, Factory} from '../js/personLib.js';
import {Sch} from '../js/school.js';

// проинициализируем фабрику
const factory = new Factory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
let school = new Sch();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше
school.add( factory.createStudent({ fullname: 'Vasia' }) );
school.add( factory.createStudent({ fullname: 'Petia' }) );
school.add( factory.createTeacher({ fullname: 'Misha' }) );
        //было лень везде править fullname на name изменил тут
// отрисуем всех студентов в dom 
// если методы называются по другому, поменяйте
// точка монтирования document.body может быть изменена на любой другой элемент DOM
school.appendToDom(document.body);

// в итоге в на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше