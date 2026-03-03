import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    ) { }

    async create(exerciseId: string, userId: string = 'default-user'): Promise<Favorite> {
        try {
            const favorite = new this.favoriteModel({ exerciseId, userId });
            return await favorite.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Exercise is already in favorites for this user');
            }
            throw error;
        }
    }

    async findAll(userId: string = 'default-user'): Promise<Favorite[]> {
        return this.favoriteModel.find({ userId }, { __v: 0 }).exec();
    }

    async remove(exerciseId: string, userId: string = 'default-user'): Promise<{ deleted: boolean }> {
        const result = await this.favoriteModel.deleteOne({ exerciseId, userId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Favorite not found');
        }
        return { deleted: true };
    }
}
