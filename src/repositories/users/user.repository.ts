import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../models/users/entities/user.model";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async save(user: User) : Promise<User>{
        return await this.repository.save(user);
    }

    async findByEmail(email: string) : Promise< User | null >{
        return await this.repository.findOneBy({ email });
    }
    
}