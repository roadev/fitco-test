const express = require('express');
const { createTeam, getTeams, getTeamById, deleteTeam } = require('../controllers/TeamController');
const { addMember, removeMember } = require('../controllers/TeamMemberController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createTeam);
router.get('/', verifyToken, getTeams);
router.get('/:id', verifyToken, getTeamById);
router.delete('/:id', verifyToken, deleteTeam);

router.post('/:id/members', verifyToken, addMember);
router.delete('/:id/members/:userId', verifyToken, removeMember);

module.exports = router;
