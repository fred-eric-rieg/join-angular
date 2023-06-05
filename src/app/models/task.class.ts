/**
 * Defines the Task class with its values and parameters for construction.
 */
export class Task {
    id!: string;
    title!: string;
    description!: string;
    status!: string;
    creationDate!: Date;
    lastUpdated!: Date;
    priority!: string;
    creatorId!: string;
    dueDate!: Date;
    category!: string;
    assignedTo!: string[];
    subtasks!: string[];

    /**
     * Creates an instance of Task.
     * @param id as string
     * @param title as string
     * @param description as string
     * @param status as string
     * @param creationDate as Date
     * @param lastUpdated as Date
     * @param priority as string
     * @param creatorId as string
     * @param dueDate as Date
     * @param category as string
     * @param assignedTo as string
     * @param subtasks as string[]
     */
    constructor (
        id: string, title: string, description: string,
        status: string, creationDate: Date, lastUpdated: Date,
        priority: string, creatorId: string, dueDate: Date,
        category: string, assignedTo: string[], subtasks: string[]
        ) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
        this.priority = priority;
        this.creatorId = creatorId;
        this.dueDate = dueDate;
        this.category = category;
        this.assignedTo = assignedTo;
        this.subtasks = subtasks;
    }

    /**
     * To store data in Firestore, the data must be in JSON format.
     * @returns a JSON object of the Task class
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            creationDate: this.creationDate,
            lastUpdated: this.lastUpdated,
            priority: this.priority,
            creatorId: this.creatorId,
            dueDate: this.dueDate,
            category: this.category,
            assignedTo: this.assignedTo,
            subtasks: this.subtasks
        };
    }

}