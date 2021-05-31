var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnCreep = require('contruction.spawnCreep');
var roleRepairer = require('role.repairer');
var roleWorker = require('role.worker');

module.exports.loop = function() {
  var spawn1 = Game.spawns['Spawn1'];

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep, spawn1);
    }
    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'repairer') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == 'worker') {
      // roleWorker.run(creep);
    }
  }
  Game.creeps['worker6'].moveTo(Game.creeps['worker6'].room.controller);

  spawnCreep.run(spawn1);
}
