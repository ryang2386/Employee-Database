//created an Employee class to store data from the employee table
class Employee {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    department: string;
    salary: number;
    manager: string;

    constructor(id: number, first_name: string, last_name: string, title: string, department: string, salary: number, manager: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }
}

export { Employee };