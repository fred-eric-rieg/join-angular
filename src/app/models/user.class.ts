/**
 * Defines the user class.
 */
export class User {
    userId!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: number;
    creationDate!: Date;
    lastUpdated!: Date;
    color!: string;

    /**
     * Creates an instance of User.
     * @param userId as string
     * @param firstName as string
     * @param lastName as string
     * @param email as string
     * @param phone as string
     * @param password as string
     * @param role as string
     * @param creationDate as Date
     * @param lastUpdated as Date
     * @param color as string
     */
    constructor (userId: string, firstName: string, lastName: string, email: string, phone: number, creationDate: Date, lastUpdated: Date, color: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.creationDate = creationDate;
        this.lastUpdated = lastUpdated;
        this.color = color;
    }

    /**
     * To store data in Firestore, the data must be in JSON format.
     * @returns a JSON object of the User class
     */
    toJSON() {
        return {
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            creationDate: this.creationDate,
            lastUpdated: this.lastUpdated,
            color: this.color
        }
    }
}