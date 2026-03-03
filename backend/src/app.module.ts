import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI! || 'mongodb://localhost:27017/healthsphere'),
    ExercisesModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
