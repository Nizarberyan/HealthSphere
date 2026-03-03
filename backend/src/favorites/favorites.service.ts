import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    ) { }

    async create(exerciseId: string): Promise<Favorite> {
        if (!isValidObjectId(exerciseId)) {
            throw new BadRequestException('Invalid exercise ID format');
        }
        try {
            const favorite = new this.favoriteModel({ exerciseId });
            return await favorite.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Exercise is already in favorites');
            }
            throw error;
        }
    }

    async findAll(): Promise<Favorite[]> {
        return this.favoriteModel.find({}, { __v: 0 }).exec();
    }

    async remove(exerciseId: string): Promise<{ deleted: boolean }> {
        if (!isValidObjectId(exerciseId)) {
            throw new BadRequestException('Invalid exercise ID format');
        }
        const result = await this.favoriteModel.deleteOne({ exerciseId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Favorite not found');
        }
        return { deleted: true };
    }
}
