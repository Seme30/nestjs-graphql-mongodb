import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Lesson]),
    ],
    providers: [LessonResolver]
})
export class LessonModule {}
