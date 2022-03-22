import { UserCreateDto } from '../../dtos/user.dto';
import { Identity } from './domain/identity';

export interface IdentityRepository {
    all(): Promise<Identity[]>;
    find(email: string, password: string | null): Promise<Identity | null>;
    create(entry: UserCreateDto): Promise<void>;
}
