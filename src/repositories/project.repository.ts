import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { ProgressComment, Project } from '../entities/models/project';
import { DateUtils } from '../utils/date-utils';
import { HashUtils } from '../utils/hash-utils';
import { BasicRepository } from './basic-repository';

export class ProjectRepository extends BasicRepository<Project> {

  private Model: Model<Project, {}>;

  constructor() {
    super();

    this.Model = this.getModel("ProjectModel");
  }

  async get(code: string): Promise<Project | null> {
    return await this.Model.findOne({"code": code});
  }

  async list(): Promise<Project[] | null> {
    return this.Model.find({}, {'_id': 0, 'progress': 0});
  }

  async save(project: Project): Promise<Project | null> {
    const today = DateUtils.toYearMonthDate(new Date());

    project.code = HashUtils.hash(project.title);
    project.status = "PRAZO";
    project.created = today;
    project.progress = [];
    project.progress.push({
      state: "ANÁLISE",
      percentual: 10,
      comments: [{
        author: project.author,
        date: today,
        text: "Projeto criado e aguardando avaliação."
      }],
      lock: false,
      nextStates: ["ANDAMENTO"]
    });

    return await this.Model.create(project);
  }

  async addComment(code: string, comment: ProgressComment): Promise<Project | null> {
    let p = await this.get(code);
    if(p == null || !p.progress) return null;

    let progress = p.progress[p.progress.length - 1];
    if(!progress.comments) progress.comments = [];
    progress.comments.push({...comment, date: DateUtils.toYearMonthDate(new Date())});

    return await this.Model.create(p);
  }

}