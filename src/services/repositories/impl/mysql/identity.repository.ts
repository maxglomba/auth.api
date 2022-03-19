import connector from '../../../../common/persistence/mysql.persistence';
import { UserCreateDto } from '../../../../dtos/user.dto';
import { Identity } from '../../domain/identity';
import { IdentityRepository } from '../../identity.repository';

export class IdentityMYSQLRepository implements IdentityRepository {
    public async all(): Promise<Identity[]> {
        const [rows] = await connector.execute(
            'SELECT id, email, created_at, updated_at FROM auth_user'
        );
        return rows as Identity[];
    }
    public async find(email: string, password: string | null): Promise<Identity | null> {
        let result:any;
        if (password) {
            [result] = await connector.execute(
                'SELECT * FROM auth_user WHERE email = ? AND password = ? ',
                [email, password]
            );
        } else {
            [result] = await connector.execute(
                'SELECT * FROM auth_user WHERE email = ? ',
                [email]
            );
        }
        if (result.length) {
            return result[0] as Identity;
        }
        return null;

    }
    public async create(entry: UserCreateDto): Promise<void> {
        await connector.execute(
            'INSERT INTO auth_user(email, password, created_at) VALUES(?, ?, ?)',
            [entry.email, entry.password, new Date]
        );
    }
}
