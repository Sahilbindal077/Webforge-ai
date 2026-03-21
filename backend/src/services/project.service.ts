import { PrismaClient } from '@prisma/client';
import { AIService } from './ai.service';

export class ProjectService {
  private prisma: PrismaClient;
  private aiService: AIService;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.aiService = new AIService();
  }

  async generateNewProject(prompt: string) {
    // 1. Ask AI to plan the structure and generate the code based on the prompt.
    const siteData = await this.aiService.generateWebsite(prompt);

    // 2. Save site structure in DB
    const project = await this.prisma.project.create({
      data: {
        promptHistory: JSON.stringify([{ role: 'user', content: prompt }]),
        files: JSON.stringify(siteData.files)
      }
    });

    return project;
  }

  async getProject(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  async refineProject(id: string, additionalPrompt: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error('Project not found');

    const history = JSON.parse(project.promptHistory);
    history.push({ role: 'user', content: additionalPrompt });

    // Ask AI to refine the layout/files based on history and new prompt
    const updatedSiteData = await this.aiService.refineWebsite(project.files, history);

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data: {
        files: JSON.stringify(updatedSiteData.files),
        promptHistory: JSON.stringify(history),
      }
    });

    return updatedProject;
  }
}
