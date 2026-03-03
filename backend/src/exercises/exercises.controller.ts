import { Controller, Get, Param } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { Exercise } from './schemas/exercise.schema';

@Controller('exercises')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) { }

    @Get()
    async findAll(): Promise<Exercise[]> {
        return this.exercisesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Exercise> {
        return this.exercisesService.findOne(id);
    }
}
