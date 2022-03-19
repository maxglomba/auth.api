import connector from '../../../../common/persistence/mssql.persistence';
import { UserCreateDto } from '../../../../dtos/user.dto';
import { Identity } from '../../domain/identity';
import { IdentityRepository } from '../../identity.repository';

export class IdentityMSSQLRepository implements IdentityRepository {
    public async all(): Promise<Identity[]> {
        const pool = await connector;
        const result = await pool.query`SELECT id, email, created_at, updated_at FROM auth_user`;
        return result.recordset as Identity[];
    }
    public async find(email: string, password: string | null): Promise<Identity | null>{
        const pool = await connector;
        let result;
        if(password){
            result = await pool.query`SELECT TOP 1 * FROM auth_user WHERE email = ${email} AND password = ${password} `;
        }else{
            result = await pool.query`SELECT TOP 1 * FROM auth_user WHERE email = ${email} `;
        }
       if(result){
        return result.recordset[0] as Identity;
       }
       return null;
       
    }
    public async create(entry: UserCreateDto): Promise<void>{
        const pool = await connector;
        await pool.query`INSERT INTO auth_user(email, password, created_at) VALUES(${entry.email}, ${entry.password}, ${new Date})`;
    }
}
