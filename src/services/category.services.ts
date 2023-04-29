import ICategory from "../interfaces/category.interface";
import Category from "../models/category.model";

export default class categoryService {
    //add new category
    async addCategory(data: ICategory) {
        return await Category.create(data)
    }

    //delete a category
    async deleteCategory(id: string) {
        return await Category.findByIdAndDelete(id)
    }

    //get all categories
    async getAllCategories() {
        return await Category.find()
    }

    //find a Category
    async findCategory(id: string) {
        return await Category.findById(id)
    }

    //update a category
    async updateCategory(id: string, data: Partial<ICategory>) {
        return await Category.findByIdAndDelete(id, data)
    }
}
