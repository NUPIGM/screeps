var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnCreep = require('spawnCreep');
var roleRepairer = require('role.repairer');
var roleWorker = require('role.worker');

module.exports.loop = function() {
  var spawn1 = Game.spawns['Spawn1'];
  var myTime = 0;

  spawnCreep.run(spawn1);

  //清理内存    begin
  // for (var name in Memory.creeps) {
  //   if (!Game.creeps[name]) {
  //     delete Memory.creeps[name];
  //   }
  // }
  //清理内存    end

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'transfer') {
      roleWorker.run(creep, spawn1);
    }
    if (creep.memory.role == 'upgrader') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }
    if (creep.memory.role == 'harvester' && creep.memory.working) {
      roleHarvester.run(creep, myTime);
    }
  }
}
