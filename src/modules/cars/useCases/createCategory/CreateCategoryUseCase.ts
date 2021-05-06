import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadyexists = this.categoriesRepository.findByName(
            name
        );

        if (categoryAlreadyexists) {
            throw new Error('category already exists!');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
