import connector from '../../../../common/persistence/mock.persistence';
import { UserCreateDto } from '../../../../dtos/user.dto';
import { Identity } from '../../domain/identity';
import { IdentityRepository } from '../../identity.repository';

export class IdentityMOCKRepository implements IdentityRepository {
    public async all(): Promise<Identity[]> {
        const table = connector.users;
        return table.map( user =>{
            return {
                id: user.id,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            };
        }) as Identity[];
    }
    public async find(email: string, password: string | null): Promise<Identity | null>{
        const table = connector.users;
        let result;
        if(password){
            result = table.find( x => x.email === email && x.password === password);
        }else{
            result = table.find( x => x.email === email);
        }
       if(result){
        return result as Identity;
       }
       return null;
       
    }
    public async create(entry: UserCreateDto): Promise<void>{
        const table = connector.users;
        connector._userId++;
        table.push({
            id: connector._userId,
            email: entry.email,
            password: entry.password,
            created_at: new Date,
            updated_at: null
        });
        
    }
}
