import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Student } from './student.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: MongoRepository<Student>
    ){}


    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({where: {id}})
    }
    

    async getStudents(): Promise<Student[]>{
        return this.studentRepository.find()
    }


    async createStudent(createStudentInput: CreateStudentInput): Promise<Student>{
        const { firstName, lastName } = createStudentInput
        const student = this.studentRepository.create({
            id: uuid(),
            firstName: firstName,
            lastName: lastName
        })

        return this.studentRepository.save(student)
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]>{
        return this.studentRepository.find({where: {
            id: {
                $in: studentIds
            }
        }})   
    }
}
