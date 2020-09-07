import { User } from '../../../models/user.model';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    token: String | null;
    session: String | null;
    errorMessage: String | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    token: null,
    session: null,
    errorMessage: null
};