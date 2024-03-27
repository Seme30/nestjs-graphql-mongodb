import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ){}


    async createStudent(createStudentInput: CreateStudentInput): Promise<Student>{
        const { firstName, lastName } = createStudentInput
        const student = this.studentRepository.create({
            id: uuid(),
            firstName: firstName,
            lastName: lastName
        })

        return this.studentRepository.save(student)
    }
}