import { compare } from 'bcrypt';
import { inject, injectable } from "tsyringe";
import { sign } from 'jsonwebtoken';

import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // User exists?
        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new Error('Email or password incorrect!');
        }

        // password correct?

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('Email or password incorrect!');
        }

        // create Jsonwebtoken
        const token = sign({}, '27887e9be47e523cfa151e30c32cccd6', {
            subject: user.id,
            expiresIn: '1d'
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };