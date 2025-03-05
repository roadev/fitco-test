const express = require('express');
const { createTeam, getTeams, getTeamById, deleteTeam } = require('../controllers/TeamController');
const { addMember, removeMember } = require('../controllers/TeamMemberController');
const { verifyToken } = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

const router = express.Router();

router.post('/', verifyToken, createTeam);
router.get('/', verifyToken, getTeams);
router.get('/:id', verifyToken, getTeamById);
router.delete('/:id', verifyToken, deleteTeam);

router.post('/:id/members', verifyToken, authorizeRole(['admin']), addMember);
router.delete('/:id/members/:userId', verifyToken, authorizeRole(['admin']), removeMember);

module.exports = router;
