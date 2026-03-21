import { Router } from 'express';
import { createProject, getProject, refineProject, downloadProject } from '../controllers/project.controller';

const router = Router();

router.post('/', createProject);
router.get('/:id', getProject);
router.post('/:id/prompt', refineProject);
router.get('/:id/download', downloadProject);

export default router;
