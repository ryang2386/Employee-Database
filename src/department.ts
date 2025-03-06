// creating Department class to store data from the department table
class Department {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export { Department };