import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './schemas/favorite.schema';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) { }

    @Post()
    async create(@Body('exerciseId') exerciseId: string): Promise<Favorite> {
        return this.favoritesService.create(exerciseId);
    }

    @Get()
    async findAll(): Promise<Favorite[]> {
        return this.favoritesService.findAll();
    }

    @Delete(':exerciseId')
    async remove(@Param('exerciseId') exerciseId: string): Promise<{ deleted: boolean }> {
        return this.favoritesService.remove(exerciseId);
    }
}
