export type TODO = {
    id: number,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string,
    deadline: string,
    completed: boolean
};

export type STORE = {
    list: TODO[],
};