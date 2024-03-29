import { Project } from "../models/project";
import { CollectionSchema } from "./ischema";

export class ProjectSchema extends CollectionSchema<Project> {

  modelName(): string {
    return "ProjectModel";
  }
  
  collectionName(): string {
    return "projects";
  }
  

  constructor(){
    super({
      code: String,
      title: String,
      status: String,
      description: String,
      department: String,
      created: String,
      expiresIn: String,
      author: String,
      finished: Boolean,
      priority: String,
      nextState: String,
      state: String,
      progress: [
        {
          state: String,
          percentual: Number,
          lock: Boolean,
          dateFinish: String,
          comments: [
            {
              text: String,
              date: String,
              author: String
            }
          ]
        }
      ]
    });
  }

}