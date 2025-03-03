class Department {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // departmentArray(rows: object[]): Department[] {
    //     const department: Department[] = [];
    //     for (const row of rows) {
    //         department.push(new Department(row.id, row.name));
    //     }
    //     return department;
    // }
}

export { Department };