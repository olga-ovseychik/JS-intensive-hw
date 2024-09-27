function getPersons(name, age) {
    const propName = name;
    const propAge = Number(age);

    if (!propName) {
        throw new Error(`'name' argument is not specified.`);
    } else if (typeof propName !== 'string') {
        throw new TypeError(`${propName} is not a string.`);
    } else if (/^[a-zA-Z]+(-[a-zA-Z]+)*[a-zA-Z]+$/.test(propName) === false) {
        throw new Error(`'name' argument must not contain numbers or any special characters.`);
    }

    if (Number.isNaN(propAge)) {
        throw new TypeError(`'age' argument is NaN.`);
    } else if (!propAge) {
        throw new Error(`'age' argument is not specified.`);
    } else if (propAge < 0) {
        throw new Error(`'age' argument must be a non-negative value.`);
    }

    function CreatePersonByConstructorFunc(name, age) {
        this.name = name;
        this.age = age;
    }

    class CreatePersonByClass {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }   
    }

    function createPersonByFactoryFunc(name, age) {
        return {
            name: name, 
            age: age
        };
    }

    return [
        {
            name: propName,
            age: propAge
        },
        new Object({
            name: propName, 
            age: propAge 
        }),
        Object.assign({}, {
            name: propName, 
            age: propAge
        }),
        Object.create({}, {
            name: {
                writable: true,
                configurable: true,
                enumerable: true,
                value: propName,
            },
            age: {
                writable: true,
                configurable: true,
                enumerable: true,
                value: propAge,
            }
        }),
        Object.fromEntries([['name', propName], ['age', propAge]]),
        {...new CreatePersonByConstructorFunc(propName, propAge)},
        {...new CreatePersonByClass(propName, propAge)},
        createPersonByFactoryFunc(propName, propAge),
        JSON.parse(`{"name": "${propName}", "age": ${propAge}}`)
    ];
}