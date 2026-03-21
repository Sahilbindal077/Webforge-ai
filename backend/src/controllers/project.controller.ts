import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';
import { PrismaClient } from '@prisma/client';
import archiver from 'archiver';

const prisma = new PrismaClient();
const projectService = new ProjectService(prisma);

export const createProject = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const result = await projectService.generateNewProject(prompt);
    res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProject(id as string);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get project', details: error.message });
  }
};

export const refineProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const result = await projectService.refineProject(id as string, prompt);
    res.json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Failed to refine project', details: error.message });
  }
};

export const downloadProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProject(id as string);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const files = JSON.parse(project.files);

    res.attachment(`project-${id}.zip`);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => { throw err; });
    archive.pipe(res);

    for (const [filename, content] of Object.entries(files)) {
      archive.append(content as string, { name: filename });
    }

    archive.finalize();
  } catch (error: any) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download project', details: error.message });
    }
  }
};
