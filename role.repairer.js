module.exports = {
  run(creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }
    if (creep.store.getFreeCapacity() > 0 && !creep.memory.building) {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {visualizePathStyle : {stroke : '#EA0000'}});
      }
    } else {
      const targets = creep.room.find(
          FIND_STRUCTURES, {filter : object => object.hits < object.hitsMax},
          object => STRUCTURE_ROAD);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
    }
  }
}
