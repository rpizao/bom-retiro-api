import { Model } from 'mongoose';
import { ProgressComment, Project } from '../entities/models/project';
import { DateUtils } from '../utils/date-utils';
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

  async addComment(code: string, comment: ProgressComment): Promise<Project | null> {
    let p = await this.get(code);
    if(p == null || !p.progress) return null;

    let progress = p.progress[p.progress.length - 1];
    if(!progress.comments) progress.comments = [];
    progress.comments.push({...comment, date: DateUtils.toYearMonthDate(new Date())});

    return await this.Model.create(p);
  }

}