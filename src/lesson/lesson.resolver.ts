import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLesson } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {

    constructor (
        private lessonService: LessonService,
        private studentService: StudentService
    ){}

    @Query(returns => LessonType)
    async lesson(@Args('id') id: string){
        return this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    async lessons(){
        return this.lessonService.getLessons()
    }

    @Mutation(returns => LessonType)
    async createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput 
    ){
        return this.lessonService.createLesson(
            createLessonInput
        )
    }

    @Mutation(returns => LessonType)
    async assignStudentsToLesson(
        @Args('assignStudentsToLesson') assignStudentsToLesson: AssignStudentsToLesson
    ){
        const { lessonId, studentIds } = assignStudentsToLesson
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }


    @ResolveField()
    async students(@Parent() lesson: Lesson) {
      return this.studentService.getManyStudents(lesson.students);
    }
}