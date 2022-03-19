export interface Identity {
    id: number;
    email: string;
    password: string;
    created_at: Date | null;
    updated_at: Date | null;
}