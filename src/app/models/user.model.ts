export class User {
    _id: String;
    email: String;    
    username: String;
    firstName: String;
    lastName: String;
    role: String;
    country: String;
    language: String;
    status: Number;
    playlists:Array<Object>;
    history: Array<Object>;
    favorite: Object;
    settings: Object;
    createdAt: String;
    updatedAt: String;
}