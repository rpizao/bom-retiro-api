import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { ProgressComment, Project } from '../entities/models/project';
import { DateUtils } from '../utils/date-utils';
import { HashUtils } from '../utils/hash-utils';
import { BasicRepository } from './basic-repository';

export class ProjectRepository extends BasicRepository<Project> {

  private static STATES = ["ANÁLISE", "ANDAMENTO", "FINALIZADO", "CANCELADO"];
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
    const today = DateUtils.toDate(new Date());

    project.code = HashUtils.hash(project.title);
    project.status = "PRAZO";
    project.created = today;
    project.progress = [];
    project.state = "ANÁLISE",
    project.nextState = "ANDAMENTO";
    project.progress.push({
      state: "ANÁLISE",
      percentual: 34,
      lock: false
    });

    return await this.Model.create(project);
  }

  async addComment(code: string, comment: ProgressComment): Promise<Project | null> {
    let p = await this.get(code);
    if(p == null || !p.progress) return null;

    let progress = p.progress[p.progress.length - 1];
    if(!progress.comments) progress.comments = [];
    progress.comments.push({...comment, date: DateUtils.toDateTime(new Date())});

    return await this.Model.create(p);
  }

  private getNextState(actual: string): string | undefined{
    const actualStateIndex = ProjectRepository.STATES.findIndex(s => actual == s);
    if(actualStateIndex == (ProjectRepository.STATES.length - 1)) return undefined;
    return ProjectRepository.STATES[actualStateIndex + 1];
  }

  private getActualStatus(p: Project): string {
    const today = DateUtils.now();
    const expires = DateUtils.parseDate(p.expiresIn);
    return today > expires ? "ATRASADO" : "PRAZO"; 
  }

  async updateStatus(code: string): Promise<Project | null> {
    let p = await this.get(code);
    if(p == null || !p.progress) return null;

    if(!p.nextState){
      // FINALIZADO
      p.finished = true;
      p.state = "FINALIZADO";
      p.nextState = undefined;
    } else {
      p.state = p.nextState;
      p.nextState = this.getNextState(p.state);
    }

    p.status = this.getActualStatus(p);

    p.progress.push({
      lock: p.status == "FINALIZADO" ? true: false,
      state: p.state,
      percentual: 33
    });

    return await this.Model.create(p);
  }

  async cancel(code: string): Promise<Project | null> {
    let p = await this.get(code);
    if(p == null || !p.progress) return null;

    p.state =  "CANCELADO";
    p.nextState = undefined;
    p.status = this.getActualStatus(p);
    p.finished = true;

    p.progress.push({
      lock: true,
      state: "CANCELADO",
      percentual: 33
    });

    return await this.Model.create(p);
  }

}