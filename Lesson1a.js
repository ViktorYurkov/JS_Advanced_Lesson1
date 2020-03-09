class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        //this.isCompleted = false;
    }
};

const repo = (function () {
    const db = [];

    function setName(id, userName){
        if(userName){
            console.log(`rename ${ db[id].name} to ${userName}`)
            db[id].name = userName;
        }
    }
    
    function getName(id) { //виведення імя
        if (db.length) {
            //console.log(`Name ${db[id].name} of ${id}`)
            return db[id].name;
        }
    };

    function getAge(id) { //виведення віку
        if (db.length) {
            //console.log(`Age ${db[id].age} of ${id}`)
            return db[id].age;
        }
    };
    
    function create(userName, userAge) {
        if (userName) {
            const taskUser = new User(userName, userAge);
            console.log(`add user name ${taskUser.name} with age  ${taskUser.age}`);
            db.push(taskUser);
           // return taskUser;
        }
    }
    create('Petro',33);
    create('Vasil',22);
    create('Ivan',45);
    
    return {
        setName: setName,
        getName: getName,
        getAge: getAge
        
    }
})();
var n = 1
repo.setName(n, 'Nazar');
console.log(`User Name ${repo.getName(n)} with id ${n}`);
console.log(`User Age ${repo.getAge(n)} with id ${n}`);

