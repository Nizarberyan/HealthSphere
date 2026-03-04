import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Workout } from './schemas/workout.schema';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
    constructor(private readonly workoutsService: WorkoutsService) { }

    @Post()
    async create(@Body() createWorkoutDto: Partial<Workout>) {
        return this.workoutsService.create(createWorkoutDto);
    }

    @Get()
    async findAll() {
        return this.workoutsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.workoutsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWorkoutDto: Partial<Workout>) {
        return this.workoutsService.update(id, updateWorkoutDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.workoutsService.remove(id);
    }
}
