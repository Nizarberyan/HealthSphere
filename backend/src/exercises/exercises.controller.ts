import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './schemas/exercise.schema';

@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) { }

    @Post()
    async create(@Body() exercise: Exercise): Promise<Exercise> {
        if (!exercise) {
            throw new BadRequestException('Exercise is required');
        }
        return this.exercisesService.create(exercise);
    }

    @Get()
    async findAll(): Promise<Exercise[]> {
        const exercises = await this.exercisesService.findAll();
        if (!exercises) {
            throw new NotFoundException('Exercises not found');
            
        }
        return exercises;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Exercise> {
        if (!id) {
            throw new BadRequestException('Exercise id is required');
        }
        return this.exercisesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() exercise: Partial<Exercise>): Promise<Exercise> {
        if (!id) {
            throw new BadRequestException('Exercise id is required');
        }
        return this.exercisesService.update(id, exercise);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
        if (!id) {
            throw new BadRequestException('Exercise id is required');
        }
        return this.exercisesService.remove(id);
    }
}
