import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
export declare class ProfessorController {
    private readonly professorService;
    constructor(professorService: ProfessorService);
    create(createProfessorDto: CreateProfessorDto): Promise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findOne(id: number): Promise<{
        nome: string;
        departamento: string;
        disciplinaID: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    } | null>;
}
