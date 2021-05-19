import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

// essa interface será implementada em /implementations
// essa interface determina todos os métodos que a classe tem que ter
interface IUsersRepository {    
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository }