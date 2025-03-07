// created a Role class to store data from the role table
class Role {
    id: number;
    title: string;
    salary: number;
    department: string;

    constructor(id: number, title: string, salary: number, department: string) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }
}

export { Role };